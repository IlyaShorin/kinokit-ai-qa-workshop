# KinoKit AI QA Workshop — Repo Contract

## 1. Goal

Build a small but realistic frontend demo repository for a 20-minute live workshop.

The repository must support this story:

> AI made frontend development faster.
> Now frontend verification becomes the bottleneck.
> Instead of asking an agent to “test the app” vaguely, we build a frontend QA harness:
> controlled MSW data, named QA scenarios, SSR/client state checks, Playwright tests, screenshot tests
> and repository skills.

The repository is not just an app.
It is a workshop artifact.

It must contain:

- a small cinema booking frontend app;
- seeded bugs for demo;
- Playwright E2E tests;
- screenshot tests;
- MSW mock API handlers;
- named QA scenarios;
- SSR/client mismatch scenario;
- repository skills/prompts for AI agents;
- fallback outputs for live demos.

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
pnpm test:msw
pnpm test:e2e
pnpm test:e2e --grep "VIP"
pnpm test:visual
pnpm codex-usage
```
