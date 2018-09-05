'use strict';

const glob = require("glob");
const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const entry = Object.assign(
  {}, ...glob.sync(`./src/**/*.ts`)
    .map( (path) => {
      const name = path.match(/^\.\/src\/(.*)\.ts$/)[1];
      return { [name]: path };
    })
);

module.exports = {
  devtool: 'inline-source-map',
  entry: entry,
  target: "node",
  output: {
    libraryExport: "default",
    libraryTarget: "umd",
    filename: '[name].js',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          compilerOptions: {
            isolatedModules: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  devtool: "source-map",
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
};
