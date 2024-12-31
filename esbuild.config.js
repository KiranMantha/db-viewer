const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['webviews/src/pages/*.tsx'],
    bundle: true,
    outdir: 'dist/webviews',
    platform: 'browser',
    loader: { '.tsx': 'tsx', '.ts': 'ts' },
    define: { 'process.env.NODE_ENV': '"production"' }
  })
  .catch(() => process.exit(1));
