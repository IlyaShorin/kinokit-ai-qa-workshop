# KinoKit AI QA Workshop — Repo Contract

## 1. Goal

Build a small but realistic frontend demo repository for a 20-minute live workshop.

The repository must support this story:

> AI made frontend development faster.
> Now frontend verification becomes the bottleneck.
> Instead of asking an agent to “test the app” vaguely, we build a frontend QA harness:
> controlled data, MSW scenarios, SSR/client mocks, Playwright tests, screenshot tests,
> repository skills and token/cost reports.

The repository is not just an app.
It is a workshop artifact.

It must contain:

- a small cinema booking frontend app;
- seeded bugs for demo;
- Playwright E2E tests;
- screenshot tests;
- MSW scenarios;
- SSR/client mismatch scenario;
- repository skills/prompts for AI agents;
- fallback outputs for live demos;
- token/cost report examples.

---

## 2. Tech stack

Use:

- Next.js with App Router;
- React;
- TypeScript;
- pnpm;
- Playwright Test;
- MSW;
- Node.js 20+;
- no backend service;
- no database.

The app should be runnable locally.

Required commands:

```bash
pnpm install
pnpm dev
pnpm test:e2e
pnpm test:e2e --grep "VIP"
pnpm test:visual
pnpm token-meter
```
