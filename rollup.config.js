import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true
      }
    ]
  },
  {
    input: 'src/browser.js',
    output: {
      file: 'dist/browser.js',
      format: 'umd',
      name: 'NuDB',
      plugins: [terser()],
      sourcemap: true
    }
  },
  {
    input: 'src/node.js',
    output: {
      file: 'dist/node.js',
      format: 'cjs',
      plugins: [terser()],
      sourcemap: true
    }
  }
];