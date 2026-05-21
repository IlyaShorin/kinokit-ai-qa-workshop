import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { setupServer } from 'msw/node';
import { bookingApiHandlers } from '../../mocks/handlers';

const server = setupServer(...bookingApiHandlers);

describe('booking API MSW handlers', () => {
  before(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  after(() => {
    server.close();
  });

  it('returns the requested QA scenario through the mock API', async () => {
    const response = await fetch('https://kinokit.local/api/sessions/evening?scenario=vip-pricing');

    assert.equal(response.status, 200);

    const scenario = await response.json();

    assert.equal(scenario.session.id, 'vip-pricing');
    assert.equal(scenario.seats.find((seat: { id: string }) => seat.id === 'B1')?.price, 240);
  });

  it('falls back to the session id when the QA scenario is unknown', async () => {
    const response = await fetch('https://kinokit.local/api/sessions/evening?scenario=unknown');

    assert.equal(response.status, 200);

    const scenario = await response.json();

    assert.equal(scenario.session.id, 'evening');
  });

  it('returns 404 for unknown sessions', async () => {
    const response = await fetch('https://kinokit.local/api/sessions/missing');

    assert.equal(response.status, 404);
  });
});
