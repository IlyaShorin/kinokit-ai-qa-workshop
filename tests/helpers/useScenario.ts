import type { Page } from '@playwright/test';

export async function useScenario(page: Page, scenarioName = 'evening') {
  await page.context().addCookies([
    {
      name: 'qa-scenario',
      value: scenarioName,
      domain: '127.0.0.1',
      path: '/'
    }
  ]);

  await page.goto('/sessions/evening');
}
