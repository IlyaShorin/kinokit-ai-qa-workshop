import type { BookingScenario } from './types';

const movie = {
  id: 'kinokit-night',
  title: 'КиноКит: Вечерний сеанс',
  description:
    'Камерная научная фантастика о команде QA-инженеров, которые учат AI-агента проверять интерфейсы без магии и случайностей.',
  ageRating: '12+'
};

const session = {
  id: 'evening',
  movieId: 'kinokit-night',
  startsAt: 'сегодня, 19:30',
  hall: 'Зал 2'
};

const seats: BookingScenario['seats'] = [
  { id: 'A1', row: 'A', number: 1, type: 'standard', status: 'occupied', price: 120 },
  { id: 'A2', row: 'A', number: 2, type: 'standard', status: 'available', price: 120 },
  { id: 'A3', row: 'A', number: 3, type: 'standard', status: 'available', price: 120 },
  { id: 'A4', row: 'A', number: 4, type: 'standard', status: 'available', price: 120 },
  { id: 'B1', row: 'B', number: 1, type: 'vip', status: 'available', price: 240 },
  { id: 'B2', row: 'B', number: 2, type: 'vip', status: 'occupied', price: 240 },
  { id: 'B3', row: 'B', number: 3, type: 'vip', status: 'available', price: 240 },
  { id: 'B4', row: 'B', number: 4, type: 'standard', status: 'occupied', price: 120 },
  { id: 'C1', row: 'C', number: 1, type: 'standard', status: 'available', price: 120 },
  { id: 'C2', row: 'C', number: 2, type: 'vip', status: 'occupied', price: 240 },
  { id: 'C3', row: 'C', number: 3, type: 'vip', status: 'available', price: 240 },
  { id: 'C4', row: 'C', number: 4, type: 'standard', status: 'available', price: 120 }
];

function createScenario(id: string): BookingScenario {
  return {
    movie,
    session: {
      ...session,
      id
    },
    seats: seats.map((seat) => ({ ...seat }))
  };
}

export const bookingScenarios: Record<string, BookingScenario> = {
  evening: createScenario('evening'),
  'vip-pricing': createScenario('vip-pricing'),
  'mobile-overlap': createScenario('mobile-overlap'),
  'hydration-mismatch': createScenario('hydration-mismatch')
};

export function getBookingScenario(scenarioId: string) {
  return bookingScenarios[scenarioId] ?? bookingScenarios.evening;
}
