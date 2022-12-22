import yargs from 'yargs/yargs';
import { build } from 'esbuild';

const argv = yargs(process.argv.slice(2)).options({
  entryPoints: { type: 'string' },
  outdir: { type: 'string' },
}).parseSync();

build({
  entryPoints: [argv.entryPoints || 'src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2019'],
  outdir: argv.outdir || 'dist',
  format: 'esm',
}).catch(() => process.exit(1));

