import { register } from 'tsconfig-paths';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseUrl = resolve(__dirname);

register({
  baseUrl,
  paths: { '@/*': ['src/*'] },
});