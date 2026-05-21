import type { Seat } from './types';

const standardPrice = 120;

export function calculateTotal(selectedSeats: Seat[]) {
  return selectedSeats.length * standardPrice;
}

export function formatPrice(price: number) {
  return `${price} ₽`;
}
