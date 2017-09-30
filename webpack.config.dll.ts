import * as path from 'path';
import * as webpack from 'webpack';
import Visualizer = require('webpack-visualizer-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const dll = process.env.DLL;
const dllName = isProduction ? `${dll}.min` : dll;

const config = {
  entry: {
    [dllName]: [path.join(__dirname, './src/' + dll + '.ts')]
  },
  output: {
    path: path.join(__dirname, `./build/dlls/${dllName}`),
    filename: '[name].js',
    library: dll
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, `./build/dlls/${dllName}/manifest.json`),
      name: dll
    }),
    new Visualizer({
      filename: './visualizer.html'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  profile: true
};

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      drop_console: true,
      drop_debugger: true
    },
    beautify: false,
    sourceMap: false,
    comments: false
  }));
}

module.exports = config;
