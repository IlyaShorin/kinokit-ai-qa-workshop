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

  await expect(page.getByLabel('Выбранные места')).toHaveText('A2');
  await expect(
    page.getByRole('button', { name: 'Место A2, стандарт, 120 ₽, доступно' })
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.getByRole('button', { name: 'Место B1, VIP, 240 ₽, доступно' })
  ).toHaveAttribute('aria-pressed', 'false');

  expect(hydrationDiagnostics).toEqual([]);
});
