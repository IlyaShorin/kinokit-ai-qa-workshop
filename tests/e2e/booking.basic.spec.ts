import { expect, test } from '@playwright/test';
import { useScenario } from '../helpers/useScenario';

test('позволяет выбрать стандартные места и оформить бронирование', async ({ page }) => {
  await useScenario(page, 'evening');

  await expect(page.getByRole('heading', { name: 'КиноКит: Вечерний сеанс' })).toBeVisible();
  await expect(page.getByText('Зал 2 · сегодня, 19:30')).toBeVisible();
  await expect(page.getByTestId('seat-map')).toBeVisible();
  await expect(page.getByLabel('Количество выбранных мест')).toHaveText('Выбрано мест: 0');

  await page.getByRole('button', { name: 'Место A2, стандарт, 120 ₽, доступно' }).click();

  await expect(page.getByLabel('Количество выбранных мест')).toHaveText('Выбрано мест: 1');
  await expect(page.getByLabel('Выбранные места')).toHaveText('A2');
  await expect(page.getByTestId('booking-total')).toHaveText('120 ₽');

  await page.getByRole('button', { name: 'Забронировать билеты' }).click();

  await expect(page.getByLabel('Подтверждение брони')).toHaveText('Бронь создана: A2');
});

test('открывает именованный сценарий с ценами мест', async ({ page }) => {
  await page.goto('/sessions/vip-pricing');

  await expect(page.getByRole('button', { name: 'Место A2, стандарт, 120 ₽, доступно' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Место B1, VIP, 240 ₽, доступно' })).toBeVisible();
});
