import * as webpack from 'webpack';
import * as path from 'path';

import HtmlPlugin = require('html-webpack-plugin');
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
import BuildNotifierPlugin = require('webpack-build-notifier');
import TSLintPlugin = require('tslint-webpack-plugin');
import StyleLintPlugin = require('stylelint-webpack-plugin');

const {
  ContextReplacementPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  optimize: {
    CommonsChunkPlugin
  }
} = webpack;

const config: webpack.Configuration = {
  devtool: 'inline-source-map',
  cache: true,
  context: process.cwd(),
  entry: {
    polyfills: path.join(__dirname, 'src', 'polyfills.ts'),
    main: path.join(__dirname, 'src', 'main.dev.ts')
  },
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
        exclude: [/node_modules/],
        loaders: [
          '@angularclass/hmr-loader?pretty=true&prod=false',
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.scss|\.css$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: 'url-loader?limit=15000',
        exclude: [/node_modules/]
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      names: [
        'main',
        'polyfills'
      ]
    }),

    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, 'src')
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

    new FriendlyErrorsPlugin(),
    new BuildNotifierPlugin({title: 'Webpack build is complete', sound: null}),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({emitErrors: false})
  ],

  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './src'),
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
