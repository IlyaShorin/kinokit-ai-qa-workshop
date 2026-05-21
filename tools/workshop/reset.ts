import { rmSync } from 'node:fs';
import { join } from 'node:path';

const targets = [
  'tests/e2e/booking.vip-pricing.spec.ts',
  'tests/e2e/booking.hydration-mismatch.spec.ts',
  'test-results',
  'playwright-report'
];

for (const target of targets) {
  rmSync(join(process.cwd(), target), { force: true, recursive: true });
  console.log(`Removed if present: ${target}`);
}
