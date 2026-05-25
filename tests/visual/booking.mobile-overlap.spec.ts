import { expect, test } from '@playwright/test';
import { useScenario } from '../helpers/useScenario';

test('mobile booking flow keeps seat map and summary readable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await useScenario(page, 'mobile-overlap');

  await page.getByRole('button', { name: 'Место A2, стандарт, 120 ₽, доступно' }).click();
  await page.getByRole('button', { name: 'Место B1, VIP, 240 ₽, доступно' }).click();
  await page.getByRole('button', { name: 'Место C3, VIP, 240 ₽, доступно' }).click();

  await expect(page.getByLabel('Количество выбранных мест')).toHaveText('Выбрано мест: 3');
  await expect(page.getByTestId('booking-flow')).toHaveScreenshot('mobile-booking-flow.png', {
    maxDiffPixelRatio: 0.01
  });
});
