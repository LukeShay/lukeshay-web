import auto from '@rollup/plugin-auto-install';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export { default as typescript } from 'rollup-plugin-typescript2';

export const createRollupConfig = (args, pkg, plugins = []) => {
  plugins = [auto(), commonjs(), resolve(), ...plugins];

  const output = [];

  if (!args.debug) {
    console.log('Running production build.');
    plugins.push(strip(), terser());
  }

  if (pkg.main) output.push({ file: pkg.main, format: 'cjs' });
  if (pkg.module) output.push({ file: pkg.module, format: 'esm' });
  if (pkg.umd) output.push({ file: pkg.umd, format: 'umd' });
  if (pkg.iife) output.push({ file: pkg.iife, format: 'iife' });

  delete args.debug;

  return {
    input: pkg.input,
    output,
    external: [...Object.keys(pkg.dependencies || {})],
    plugins,
  };
};

export const createTypescriptRollupConfig = (pkg) => {
  return createRollupConfig(pkg, [typescript({ tsconfig: './tsconfig.json' })]);
};
