import { expect, test } from '@playwright/test';

test('booking works', async ({ page }) => {
  await page.goto('/sessions/evening');
  await page.waitForTimeout(1000);
  await page.locator('.seat-button.vip').click();
  await expect(page.locator('body')).toContainText('240');
});
