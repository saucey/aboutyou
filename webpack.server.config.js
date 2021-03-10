const webpack = require('webpack');

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodemonPlugin = require('nodemon-webpack-plugin');

let config = {
  mode: 'production',
  entry: { server: './server.ts' },
  devtool: 'inline-source-map',
  devServer: {},
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist/server'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
    ],
  },
  plugins: [],
};
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.plugins.push(new nodemonPlugin());
    config.watch = true;
  }

  if (argv.mode === 'production') {
  }
  const { environment } = env || {};
  createReplaceEnvironmentPlugin(environment);
  return config;
};

function createReplaceEnvironmentPlugin(environment) {
  return new webpack.NormalModuleReplacementPlugin(/environments\/environment/gi, resource => {
    if (!environment || environment === 'development') {
      return resource;
    } else {
      return (resource.request += '.' + environment);
    }
  });
}
