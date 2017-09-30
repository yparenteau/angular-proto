import * as webpack from 'webpack';
import * as path from 'path';

import HtmlPlugin = require('html-webpack-plugin');
import TSLintPlugin = require('tslint-webpack-plugin');
import StyleLintPlugin = require('stylelint-webpack-plugin');
import HardSourcePlugin = require('hard-source-webpack-plugin');
import { dllReferencePlugins } from './webpack.utils';

const config: webpack.Configuration = {
  devtool: 'inline-source-map',
  cache: true,
  context: process.cwd(),
  entry: [
    path.join(process.cwd(), './webpack/dlls/polyfills.ts'),
    path.join(process.cwd(), './src/main.dev.ts')
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          '@angularclass/hmr-loader?pretty=true&prod=false',
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.scss|\.css$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loaders: ['html-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: 'url-loader?limit=15000',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    ...dllReferencePlugins(['polyfills', 'vendor', 'devtools'], process.cwd()),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(process.cwd(), 'src')
    ),

    new HtmlPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency',
      favicon: 'favicon.ico',
      baseUrl: '/',
      hash: true
    }),

    new TSLintPlugin({
      files: [
        'src/**/*.ts'
      ],
      project: './tsconfig.json',
      typeCheck: true
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // https://bocoup.com/blog/screencast-transcript-improving-webpack-build-times
    new HardSourcePlugin({
      cacheDirectory: path.join(process.cwd(), './node_modules/.cache/hardsource/[confighash]'),
      recordsPath: path.join(process.cwd(), './node_modules/.cache/hardsource/[confighash]/records.json'),
      configHash: function(webpackConfig) {
        return require('node-object-hash')().hash(webpackConfig);
      }
    }),
    new StyleLintPlugin({emitErrors: false})
  ],

  devServer: {
    hot: true,
    contentBase: path.join(process.cwd(), './src'),
    port: 3000,
    historyApiFallback: true,
    compress: true,
    stats: {
      'colors': true,
      'chunks': false,
      'errors-only': true
    }
  }
};


export default config;
