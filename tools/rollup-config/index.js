import auto from '@rollup/plugin-auto-install';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export { default as typescript } from 'rollup-plugin-typescript2';

export const createRollupConfig = (pkg, plugins = []) => {
  const rollupConfig = {
    input: pkg.input,
    output: [],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [auto(), commonjs(), resolve(), strip(), terser(), ...plugins],
  };

  if (pkg.cjs) rollupConfig.output.push({ file: pkg.cjs, format: 'cjs' });
  if (pkg.esm) rollupConfig.output.push({ file: pkg.esm, format: 'esm' });
  if (pkg.umd) rollupConfig.output.push({ file: pkg.umd, format: 'umd' });
  if (pkg.iife) rollupConfig.output.push({ file: pkg.iife, format: 'iife' });

  return rollupConfig;
};

export const createTypescriptRollupConfig = (pkg) => {
  return createRollupConfig(pkg, [typescript({ tsconfig: './tsconfig.json' })]);
};
