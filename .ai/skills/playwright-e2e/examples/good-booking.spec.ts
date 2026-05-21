import { expect, test } from '@playwright/test';
import { useScenario } from '../../../../tests/helpers/useScenario';

test('VIP pricing sums standard A2 and VIP B1 as 360 ₽', async ({ page }) => {
  await useScenario(page, 'vip-pricing');

  await page.getByRole('button', { name: 'Место A2, стандарт, 120 ₽, доступно' }).click();
  await page.getByRole('button', { name: 'Место B1, VIP, 240 ₽, доступно' }).click();

  await expect(page.getByLabel('Выбранные места')).toHaveText('A2, B1');
  await expect(page.getByTestId('booking-total')).toHaveText('360 ₽');
});
