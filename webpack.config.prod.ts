import * as webpack from 'webpack';
import * as path from 'path';
import { AotPlugin } from '@ngtools/webpack';

import HtmlPlugin = require('html-webpack-plugin');
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
import BuildNotifierPlugin = require('webpack-build-notifier');
import TSLintPlugin = require('tslint-webpack-plugin');
import StyleLintPlugin = require('stylelint-webpack-plugin');

const {
  ContextReplacementPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  optimize: {
    CommonsChunkPlugin
  }
} = webpack;

const isProd = process.env.NODE_ENV === 'production';
const entryFile = isProd ? 'main.prod.ts' : 'main.dev.ts';

const tsLoaders =  /*isProd
  ? ['@ngtools/webpack']
  :*/ [
    '@angularclass/hmr-loader?pretty=true&prod=false',
    'awesome-typescript-loader',
    'angular2-template-loader'
  ];

const envPlugins = isProd
  ? [
    // new AotPlugin({
    //   tsConfigPath: './tsconfig.aot.json',
    //   entryModule: 'src/app.module#AppModule'
    // })
  ]
  : [];

const config: webpack.Configuration = {
  // devtool: 'inline-source-map',
  cache: true,
  context: process.cwd(),
  entry: path.join(__dirname, 'src', entryFile),
  //   {
  //   polyfills: path.join(__dirname, 'src', 'polyfills.ts'),
  //   client: path.join(__dirname, 'src', entryFile)
  // },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.ts/, use: '@ngtools/webpack' },
      // {
      //   test: /\.ts$/,
      //   exclude: [/node_modules/],
      //   loaders: tsLoaders
      // },
      {
        test: /\.scss|\.css$/,
        loaders: ['css-loader', 'sass-loader']
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
    // new CommonsChunkPlugin({
    //   names: [
    //     'client',
    //     'polyfills'
    //   ]
    // }),

    new AotPlugin({
      tsConfigPath: path.join(__dirname, 'tsconfig.aot.json'),
      entryModule: path.join(__dirname, 'src/app.module#AppModule')
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

    // new FriendlyErrorsPlugin(),
    new BuildNotifierPlugin({title: 'Webpack build is complete', sound: null}),
    new HotModuleReplacementPlugin(),
    // new NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({emitErrors: false}),
    ...envPlugins
  ],

  // devServer: {
  //   hot: true,
  //   contentBase: path.join(__dirname, './src'),
  //   port: 3000,
  //   historyApiFallback: true,
  //   compress: true,
  //   stats: {
  //     'colors': true,
  //     'chunks': false,
  //     'errors-only': true
  //   }
  // }
};

export default config;
