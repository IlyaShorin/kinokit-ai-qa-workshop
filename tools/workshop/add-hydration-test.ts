import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const source = join(process.cwd(), 'cases/03-hydration-mismatch/generated-regression.spec.ts');
const target = join(process.cwd(), 'tests/e2e/booking.hydration-mismatch.spec.ts');

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);

console.log(`Added hydration regression test: ${target}`);
