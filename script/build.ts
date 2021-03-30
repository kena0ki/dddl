import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { build } from 'esbuild';

const argv = yargs(hideBin(process.argv)).argv;

build({
  entryPoints: [argv.entryPoints || 'src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2019'],
  outdir: argv.outdir || 'dist',
  format: 'esm',
}).catch(() => process.exit(1));

