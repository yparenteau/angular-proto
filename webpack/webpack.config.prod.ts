import * as webpack from 'webpack';
import * as path from 'path';
import { AotPlugin } from '@ngtools/webpack';
import HtmlPlugin = require('html-webpack-plugin');
import Visualizer = require('webpack-visualizer-plugin');
import AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
import { dllReferencePlugins } from './webpack.utils';

const config: webpack.Configuration = {
  devtool: 'source-map',
  context: process.cwd(),
  entry: [
    path.join(process.cwd(), './webpack/dlls/polyfills.ts'),
    path.join(process.cwd(), './src/main.ts')
  ],
  output: {
    path: path.join(process.cwd(), './build/dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    ...dllReferencePlugins(['polyfills', 'vendor'], process.cwd()),

    new AotPlugin({
      tsConfigPath: path.join(process.cwd(), './tsconfig.json'),
      entryModule: path.join(process.cwd(), './src/app.module#AppModule')
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),

    new HtmlPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency',
      favicon: 'favicon.ico',
      baseUrl: '/',
      hash: true
    }),

    new Visualizer({
      filename: './visualizer.html'
    }),
    // To remove warning: Critical dependency: the request of a dependency is an expression
    // WARNING in ./node_modules/@angular/core/@angular/core.es5.js
    // new webpack.ContextReplacementPlugin(
    //   /angular(\\|\/)core(\\|\/)@angular/,
    //   path.join(__dirname, 'src')
    // )
  ],
  resolve: {
    extensions: ['.ts', '.js', '.html'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loaders: ['html-loader']
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        loaders: ['@ngtools/webpack']
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: 'url-loader?limit=15000',
        exclude: [/node_modules/]
      },
    ]
  }
};

export default config;
