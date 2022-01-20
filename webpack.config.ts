import * as path from 'path';
import type { Configuration } from "webpack";

const config: Configuration = {
  mode: 'development',
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'color.js',
    library: {
      type: 'umd'
    }
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
}

module.exports = config;