import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

type TokenReport = {
  case: string;
  mode: string;
  approxInputTokens: number;
  approxOutputTokens: number;
  toolCalls: number;
  usefulFindings: number;
  acceptedArtifacts: string[];
};

function collectReportFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return collectReportFiles(fullPath);
    }

    return entry.startsWith('token-report.') && entry.endsWith('.json') ? [fullPath] : [];
  });
}

function readReport(filePath: string): TokenReport {
  return JSON.parse(readFileSync(filePath, 'utf8')) as TokenReport;
}

function printReport(reports: TokenReport[]) {
  console.log('Case                         Mode             Tokens   Tool calls   Findings   Artifacts');
  console.log('---------------------------  ---------------  -------  -----------  ---------  -----------------------');

  for (const report of reports) {
    const tokens = report.approxInputTokens + report.approxOutputTokens;
    const artifacts = report.acceptedArtifacts.length > 0 ? report.acceptedArtifacts.join(', ') : '-';

    console.log(
      `${report.case.padEnd(27)}  ${report.mode.padEnd(15)}  ${String(tokens).padStart(7)}  ${String(report.toolCalls).padStart(11)}  ${String(report.usefulFindings).padStart(9)}  ${artifacts}`
    );
  }
}

function main() {
  const command = process.argv[2] ?? 'report';

  if (command !== 'report') {
    console.error(`Unknown token-meter command: ${command}`);
    process.exit(1);
  }

  const reportFiles = collectReportFiles(join(process.cwd(), 'cases'));
  const reports = reportFiles.map(readReport).sort((left, right) => {
    return left.case.localeCompare(right.case);
  });

  printReport(reports);
}

main();
