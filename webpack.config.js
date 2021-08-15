const path = require('path');
const serverlessWebpack = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  entry: serverlessWebpack.lib.entries,
  resolve: {
    extensions: ['.ts'],
    alias: {
      pg: path.resolve(__dirname, 'empty_module')
    }
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '.serverless'),
          path.resolve(__dirname, '.webpack'),
        ]
      }
    ]
  },
}
