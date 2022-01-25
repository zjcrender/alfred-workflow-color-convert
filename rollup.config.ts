import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const configs: RollupOptions[] = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/color.js',
      format: 'cjs',
      sourcemap: false,
    },
    plugins: [
      typescript(),
      commonjs(),
      nodeResolve(),
      terser({ format: { comments: false } })
    ],
    external: [/^node:/]
  }
];

export default configs;
