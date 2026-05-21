import { bookingApiOrigin } from './apiContract';
import type { BookingScenario } from './types';

export async function fetchBookingScenario(sessionId: string, qaScenario?: string) {
  const url = new URL(`/api/sessions/${sessionId}`, bookingApiOrigin);

  if (qaScenario !== undefined) {
    url.searchParams.set('scenario', qaScenario);
  }

  const response = await fetch(url, { cache: 'no-store' });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error(`Booking API request failed with status ${response.status}`);
  }

  return (await response.json()) as BookingScenario;
}
