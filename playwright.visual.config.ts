import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3001'
  },
  webServer: {
    command: 'pnpm build && pnpm exec next start --hostname 127.0.0.1 --port 3001',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: false,
    timeout: 180_000
  }
});
