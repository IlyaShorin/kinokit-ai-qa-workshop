import { expect, test } from '@playwright/test';
import { useScenario } from '../../tests/helpers/useScenario';

test('hydration keeps server and client booking state consistent', async ({ page }) => {
  const hydrationDiagnostics: string[] = [];

  page.on('console', (message) => {
    const text = message.text();

    if (/hydration|hydrated|server rendered|client properties/i.test(text)) {
      hydrationDiagnostics.push(text);
    }
  });

  page.on('pageerror', (error) => {
    if (/hydration|hydrated|server rendered|client properties/i.test(error.message)) {
      hydrationDiagnostics.push(error.message);
    }
  });

  await useScenario(page, 'hydration-mismatch');

  await expect(page.getByTestId('hydration-probe')).toHaveText('SSR и клиент согласованы: A2');
  expect(hydrationDiagnostics).toEqual([]);
});
