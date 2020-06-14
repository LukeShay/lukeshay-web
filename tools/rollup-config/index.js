import auto from '@rollup/plugin-auto-install';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export const javascriptConfig = (pkg) => {
  const config = {
    input: pkg.input,
    output: [],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [terser(), resolve(), commonjs(), strip(), auto()],
  };

  if (pkg.cjs) config.output.push({ file: pkg.cjs, format: 'cjs' });
  if (pkg.esm) config.output.push({ file: pkg.esm, format: 'esm' });
  if (pkg.umd) config.output.push({ file: pkg.umd, format: 'umd' });
  if (pkg.iife) config.output.push({ file: pkg.iife, format: 'iife' });

  return config;
};

export const typescriptConfig = (pkg) => {
  const config = javascriptConfig(pkg);

  config.plugins.push(
    typescript({
      tsconfig: './tsconfig.json',
    })
  );

  return config;
};
