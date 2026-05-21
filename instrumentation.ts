export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startMockServer } = await import('./mocks/node');
    startMockServer();
  }
}
