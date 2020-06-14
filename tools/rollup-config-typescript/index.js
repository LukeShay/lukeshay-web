const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const strip = require('@rollup/plugin-strip');
const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');

module.exports = (pkg) => {
  const config = {
    input: pkg.main,
    output: [],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser(),
      resolve(),
      commonjs(),
      strip(),
    ],
  };

  pkg.cjs && config.output.push({ file: pkg.cjs, format: 'cjs' });
  pkg.es && config.output.push({ file: pkg.es, format: 'es' });
  pkg.umd && config.output.push({ file: pkg.umd, format: 'umd' });
  pkg.iife && config.output.push({ file: pkg.iife, format: 'iife' });

  return config;
};
