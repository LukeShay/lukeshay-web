import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';

export function get_config(pkg, input, cjs, es, umd, iife) {
  var config = {
    input,
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

  if (cjs) {
    config.output.append({ file: pkg.cjs, format: 'cjs' });
  }

  if (es) {
    config.output.append({ file: pkg.es, format: 'es' });
  }

  if (umd) {
    config.output.append({ file: pkg.umd, format: 'umd' });
  }

  if (iife) {
    config.output.append({ file: pkg.iife, format: 'iife' });
  }
}

export const config = {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.umd,
      format: 'umd',
      name: 'PaymentGateway',
    },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'PaymentGateway',
    },
  ],
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
