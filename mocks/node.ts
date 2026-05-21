import { setupServer } from 'msw/node';
import { bookingApiHandlers } from './handlers';

const server = setupServer(...bookingApiHandlers);

declare global {
  var __kinokitMswServerStarted: boolean | undefined;
}

export function startMockServer() {
  if (globalThis.__kinokitMswServerStarted) {
    return;
  }

  server.listen({ onUnhandledRequest: 'bypass' });
  globalThis.__kinokitMswServerStarted = true;
}
