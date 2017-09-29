import * as webpack from 'webpack';
import * as path from 'path';
import { AotPlugin } from '@ngtools/webpack';
import HtmlPlugin = require('html-webpack-plugin');
import CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const config: webpack.Configuration = {
  entry: {
    polyfills: path.join(__dirname, 'src', 'polyfills.ts'),
    main: './src/main.prod.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
    new CommonsChunkPlugin({
      names: [
        'main',
        'polyfills'
      ]
    }),
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
        test: /\.(png|jpg|svg)$/,
        use: 'url-loader?limit=15000',
        exclude: [/node_modules/]
      },
    ]
  },
  devtool: '#source-map',
};

export default config;
