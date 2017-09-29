import * as webpack from 'webpack';
import * as path from 'path';
import { AotPlugin } from '@ngtools/webpack';
import HtmlPlugin = require('html-webpack-plugin');
import Visualizer = require('webpack-visualizer-plugin');
import AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const config: webpack.Configuration = {
  entry:  './src/main.prod.ts',
  output: {
    path: path.join(__dirname, './build/dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: path.join(__dirname, 'tsconfig.json'),
      entryModule: path.join(__dirname, 'src', 'app.module#AppModule')
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

    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, `./build/polyfills.min/manifest.json`),
      hash: true
    } as any),

    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, `./build/vendor.min/manifest.json`),
      hash: true
    } as any),

    new AddAssetHtmlPlugin([
      {
        filepath: path.join(__dirname, `./build/polyfills.min/polyfills.min.js`),
        includeSourcemap: false,
        hash: true
      },
      {
        filepath: path.join(__dirname, `./build/vendor.min/vendor.min.js`),
        includeSourcemap: false,
        hash: true
      }
    ]),

    // To remove warning: Critical dependency: the request of a dependency is an expression
    // WARNING in ./node_modules/@angular/core/@angular/core.es5.js
    // new webpack.ContextReplacementPlugin(
    //   /angular(\\|\/)core(\\|\/)@angular/,
    //   path.join(__dirname, 'src')
    // )
    // new webpack.IgnorePlugin(/^\.\/hmr/, /angularclass$/)
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
  },
  devtool: '#source-map',
};

export default config;
