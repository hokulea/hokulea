import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const publishDir = resolve(root, 'publish');
const explorer = resolve(root, 'explorer/storybook-static');
const ember = resolve(root, 'ember/package/storybook-static');

rmSync(publishDir, { recursive: true, force: true });
mkdirSync(publishDir, { recursive: true });

cpSync(explorer, publishDir, { recursive: true });
cpSync(ember, resolve(publishDir, 'ember'), { recursive: true });
