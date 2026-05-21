import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type TokenUsage = {
  inputTokens: number;
  cachedInputTokens: number;
  outputTokens: number;
  reasoningOutputTokens: number;
  totalTokens: number;
};

export type CodexSessionReport = TokenUsage & {
  session: string;
  startedAt: string;
  lastTokenEventAt: string;
  cwd: string;
  model: string;
  effort: string;
  turns: number;
};

type CodexSessionOptions = {
  codexHome?: string;
  project?: string;
  days?: number;
  limit?: number;
  now?: Date;
};

type CliOptions = {
  project?: string;
  days?: number;
  limit?: number;
  codexHome?: string;
};

function collectFiles(directory: string, predicate: (filePath: string) => boolean): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return collectFiles(fullPath, predicate);
    }

    return predicate(fullPath) ? [fullPath] : [];
  });
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringField(source: Record<string, unknown>, key: string): string | undefined {
  const value = source[key];
  return typeof value === 'string' ? value : undefined;
}

function numberField(source: Record<string, unknown>, key: string): number {
  const value = source[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function readTokenUsage(source: unknown): TokenUsage | undefined {
  if (!isObject(source)) {
    return undefined;
  }

  return {
    inputTokens: numberField(source, 'input_tokens'),
    cachedInputTokens: numberField(source, 'cached_input_tokens'),
    outputTokens: numberField(source, 'output_tokens'),
    reasoningOutputTokens: numberField(source, 'reasoning_output_tokens'),
    totalTokens: numberField(source, 'total_tokens')
  };
}

function parseJsonLine(line: string): unknown {
  try {
    return JSON.parse(line);
  } catch {
    return undefined;
  }
}

function parseCodexSession(filePath: string): CodexSessionReport | undefined {
  const usage: TokenUsage = {
    inputTokens: 0,
    cachedInputTokens: 0,
    outputTokens: 0,
    reasoningOutputTokens: 0,
    totalTokens: 0
  };

  let startedAt = '';
  let lastTokenEventAt = '';
  let cwd = '';
  let model = '';
  let effort = '';
  let turns = 0;

  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    if (line.trim().length === 0) {
      continue;
    }

    const parsed = parseJsonLine(line);
    if (!isObject(parsed)) {
      continue;
    }

    const timestamp = stringField(parsed, 'timestamp');
    if (timestamp !== undefined && startedAt.length === 0) {
      startedAt = timestamp;
    }

    const payload = parsed.payload;
    if (!isObject(payload)) {
      continue;
    }

    if (parsed.type === 'turn_context') {
      cwd = cwd.length > 0 ? cwd : stringField(payload, 'cwd') ?? '';
      model = model.length > 0 ? model : stringField(payload, 'model') ?? '';
      effort = effort.length > 0 ? effort : stringField(payload, 'effort') ?? '';
      continue;
    }

    if (parsed.type !== 'event_msg' || payload.type !== 'token_count') {
      continue;
    }

    const info = payload.info;
    if (!isObject(info)) {
      continue;
    }

    const lastTokenUsage = readTokenUsage(info.last_token_usage);
    if (lastTokenUsage === undefined) {
      continue;
    }

    usage.inputTokens += lastTokenUsage.inputTokens;
    usage.cachedInputTokens += lastTokenUsage.cachedInputTokens;
    usage.outputTokens += lastTokenUsage.outputTokens;
    usage.reasoningOutputTokens += lastTokenUsage.reasoningOutputTokens;
    usage.totalTokens += lastTokenUsage.totalTokens;
    turns += 1;

    if (timestamp !== undefined) {
      lastTokenEventAt = timestamp;
    }
  }

  if (turns === 0) {
    return undefined;
  }

  return {
    session: basename(filePath),
    startedAt,
    lastTokenEventAt,
    cwd,
    model,
    effort,
    turns,
    ...usage
  };
}

function isWithinDays(report: CodexSessionReport, days: number | undefined, now: Date): boolean {
  if (days === undefined) {
    return true;
  }

  const timestamp = Date.parse(report.lastTokenEventAt || report.startedAt);
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  return timestamp >= now.getTime() - days * 24 * 60 * 60 * 1000;
}

export function collectCodexSessionReports(options: CodexSessionOptions = {}): CodexSessionReport[] {
  const codexHome = options.codexHome ?? process.env.CODEX_HOME ?? join(homedir(), '.codex');
  const sessionsDirectory = join(codexHome, 'sessions');
  const now = options.now ?? new Date();

  const reports = collectFiles(sessionsDirectory, (filePath) => filePath.endsWith('.jsonl'))
    .map(parseCodexSession)
    .filter((report): report is CodexSessionReport => report !== undefined)
    .filter((report) => options.project === undefined || report.cwd.includes(options.project))
    .filter((report) => isWithinDays(report, options.days, now))
    .sort((left, right) => right.lastTokenEventAt.localeCompare(left.lastTokenEventAt));

  return options.limit === undefined ? reports : reports.slice(0, options.limit);
}

function totalUsage(reports: CodexSessionReport[]): TokenUsage {
  return reports.reduce<TokenUsage>(
    (accumulator, report) => ({
      inputTokens: accumulator.inputTokens + report.inputTokens,
      cachedInputTokens: accumulator.cachedInputTokens + report.cachedInputTokens,
      outputTokens: accumulator.outputTokens + report.outputTokens,
      reasoningOutputTokens: accumulator.reasoningOutputTokens + report.reasoningOutputTokens,
      totalTokens: accumulator.totalTokens + report.totalTokens
    }),
    {
      inputTokens: 0,
      cachedInputTokens: 0,
      outputTokens: 0,
      reasoningOutputTokens: 0,
      totalTokens: 0
    }
  );
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

function shortCwd(cwd: string): string {
  if (cwd.length === 0) {
    return '-';
  }

  return basename(cwd);
}

function printCodexReport(reports: CodexSessionReport[]) {
  if (reports.length === 0) {
    console.log('No Codex token usage found.');
    return;
  }

  const totals = totalUsage(reports);

  console.log('Codex local usage');
  console.log('Source: local Codex session JSONL files, not provider billing');
  console.log(`Sessions: ${reports.length}`);
  console.log(
    `Total: ${formatNumber(totals.totalTokens)} tokens | input ${formatNumber(totals.inputTokens)} | cached ${formatNumber(totals.cachedInputTokens)} | output ${formatNumber(totals.outputTokens)} | reasoning ${formatNumber(totals.reasoningOutputTokens)}`
  );
  console.log('');
  console.log('Date        Project                  Model              Turns       Total       Input      Cached      Output   Reasoning');
  console.log('----------  -----------------------  -----------------  -----  ----------  ----------  ----------  ----------  ----------');

  for (const report of reports) {
    const date = (report.lastTokenEventAt || report.startedAt).slice(0, 10);

    console.log(
      `${date.padEnd(10)}  ${shortCwd(report.cwd).padEnd(23)}  ${report.model.padEnd(17)}  ${String(report.turns).padStart(5)}  ${formatNumber(report.totalTokens).padStart(10)}  ${formatNumber(report.inputTokens).padStart(10)}  ${formatNumber(report.cachedInputTokens).padStart(10)}  ${formatNumber(report.outputTokens).padStart(10)}  ${formatNumber(report.reasoningOutputTokens).padStart(10)}`
    );
  }
}

function readCliOptions(args: string[]): CliOptions {
  const options: CliOptions = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const value = args[index + 1];

    if (arg === '--project' && value !== undefined) {
      options.project = value;
      index += 1;
    } else if (arg === '--days' && value !== undefined) {
      options.days = Number(value);
      index += 1;
    } else if (arg === '--limit' && value !== undefined) {
      options.limit = Number(value);
      index += 1;
    } else if (arg === '--codex-home' && value !== undefined) {
      options.codexHome = value;
      index += 1;
    } else {
      throw new Error(`Unknown codex-usage option: ${arg}`);
    }
  }

  if (options.days !== undefined && (!Number.isInteger(options.days) || options.days < 1)) {
    throw new Error('--days must be a positive integer');
  }

  if (options.limit !== undefined && (!Number.isInteger(options.limit) || options.limit < 1)) {
    throw new Error('--limit must be a positive integer');
  }

  return options;
}

function main() {
  const options = readCliOptions(process.argv.slice(2));
  printCodexReport(collectCodexSessionReports(options));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
