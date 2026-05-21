import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const source = join(process.cwd(), 'cases/01-vip-pricing/generated-regression.spec.ts');
const target = join(process.cwd(), 'tests/e2e/booking.vip-pricing.spec.ts');

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);

console.log(`Added VIP regression test: ${target}`);
