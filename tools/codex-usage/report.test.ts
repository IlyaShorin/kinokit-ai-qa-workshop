import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { collectCodexSessionReports } from './report';

describe('collectCodexSessionReports', () => {
  it('aggregates token_count events from Codex JSONL sessions', () => {
    const codexHome = mkdtempSync(join(tmpdir(), 'kinokit-codex-sessions-'));
    const sessionDirectory = join(codexHome, 'sessions', '2026', '05', '21');
    mkdirSync(sessionDirectory, { recursive: true });

    writeFileSync(
      join(sessionDirectory, 'rollout.jsonl'),
      [
        JSON.stringify({
          timestamp: '2026-05-21T09:00:00.000Z',
          type: 'turn_context',
          payload: {
            cwd: '/repo/kinokit-ai-qa-workshop',
            model: 'gpt-5.5',
            effort: 'medium'
          }
        }),
        JSON.stringify({
          timestamp: '2026-05-21T09:01:00.000Z',
          type: 'event_msg',
          payload: {
            type: 'token_count',
            info: {
              last_token_usage: {
                input_tokens: 100,
                cached_input_tokens: 40,
                output_tokens: 20,
                reasoning_output_tokens: 5,
                total_tokens: 120
              }
            }
          }
        }),
        JSON.stringify({
          timestamp: '2026-05-21T09:02:00.000Z',
          type: 'event_msg',
          payload: {
            type: 'token_count',
            info: {
              last_token_usage: {
                input_tokens: 200,
                cached_input_tokens: 70,
                output_tokens: 30,
                reasoning_output_tokens: 7,
                total_tokens: 230
              }
            }
          }
        })
      ].join('\n')
    );

    const reports = collectCodexSessionReports({ codexHome });

    assert.deepEqual(reports, [
      {
        session: 'rollout.jsonl',
        startedAt: '2026-05-21T09:00:00.000Z',
        lastTokenEventAt: '2026-05-21T09:02:00.000Z',
        cwd: '/repo/kinokit-ai-qa-workshop',
        model: 'gpt-5.5',
        effort: 'medium',
        turns: 2,
        inputTokens: 300,
        cachedInputTokens: 110,
        outputTokens: 50,
        reasoningOutputTokens: 12,
        totalTokens: 350
      }
    ]);
  });

  it('filters sessions by project name and day window', () => {
    const codexHome = mkdtempSync(join(tmpdir(), 'kinokit-codex-sessions-'));
    const sessionDirectory = join(codexHome, 'sessions', '2026', '05', '21');
    mkdirSync(sessionDirectory, { recursive: true });

    writeFileSync(
      join(sessionDirectory, 'matching.jsonl'),
      [
        JSON.stringify({
          timestamp: '2026-05-20T12:00:00.000Z',
          type: 'turn_context',
          payload: {
            cwd: '/repo/kinokit-ai-qa-workshop',
            model: 'gpt-5.5'
          }
        }),
        JSON.stringify({
          timestamp: '2026-05-20T12:01:00.000Z',
          type: 'event_msg',
          payload: {
            type: 'token_count',
            info: {
              last_token_usage: {
                input_tokens: 10,
                cached_input_tokens: 0,
                output_tokens: 5,
                reasoning_output_tokens: 0,
                total_tokens: 15
              }
            }
          }
        })
      ].join('\n')
    );

    writeFileSync(
      join(sessionDirectory, 'other-project.jsonl'),
      [
        JSON.stringify({
          timestamp: '2026-05-20T12:00:00.000Z',
          type: 'turn_context',
          payload: {
            cwd: '/repo/another-project',
            model: 'gpt-5.5'
          }
        }),
        JSON.stringify({
          timestamp: '2026-05-20T12:01:00.000Z',
          type: 'event_msg',
          payload: {
            type: 'token_count',
            info: {
              last_token_usage: {
                input_tokens: 20,
                cached_input_tokens: 0,
                output_tokens: 5,
                reasoning_output_tokens: 0,
                total_tokens: 25
              }
            }
          }
        })
      ].join('\n')
    );

    writeFileSync(
      join(sessionDirectory, 'old.jsonl'),
      [
        JSON.stringify({
          timestamp: '2026-05-15T12:00:00.000Z',
          type: 'turn_context',
          payload: {
            cwd: '/repo/kinokit-ai-qa-workshop',
            model: 'gpt-5.5'
          }
        }),
        JSON.stringify({
          timestamp: '2026-05-15T12:01:00.000Z',
          type: 'event_msg',
          payload: {
            type: 'token_count',
            info: {
              last_token_usage: {
                input_tokens: 30,
                cached_input_tokens: 0,
                output_tokens: 5,
                reasoning_output_tokens: 0,
                total_tokens: 35
              }
            }
          }
        })
      ].join('\n')
    );

    const reports = collectCodexSessionReports({
      codexHome,
      project: 'kinokit-ai-qa-workshop',
      days: 2,
      now: new Date('2026-05-21T12:00:00.000Z')
    });

    assert.equal(reports.length, 1);
    assert.equal(reports[0]?.session, 'matching.jsonl');
    assert.equal(reports[0]?.totalTokens, 15);
  });
});
