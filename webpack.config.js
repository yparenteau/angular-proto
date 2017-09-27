const path = require("path")
// const config = require("./config")
// const base_webpack_config = require("./webpack_base_config")

const webpack = require("webpack")
// const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const WebpackBuildNotifierPlugin = require("webpack-build-notifier")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// // add hot-reload related code to entry chunks
// Object.keys(base_webpack_config.entry).forEach(function (name) {
//     base_webpack_config.entry[name] = [path.join(__dirname, "dev_client")].concat(base_webpack_config.entry[name])
// })

// dev config
module.exports = {
  "cache": true,
  "entry": {
    "polyfills": path.join(__dirname, "src", "polyfills.ts"),
    // "vendor": path.join(__dirname, "..", "src", "vendor.ts"),
    "client": path.join(__dirname, "src", "main.ts"),
    // "styles": path.join(__dirname, "..", "src", "styles", "style.root.scss")
  },
  "resolve": {
    "extensions": [".ts", ".js"]
  },
  "output": {
    "filename": "[name].js",
    // "path": config.build.assetsRoot,
    // "publicPath": process.env.NODE_ENV === "production"
    //     ? config.build.assetsPublicPath
    //     : config.dev.assetsPublicPath
  },
  "module": {
    "rules": [
      {
        "test": /\.ts$/,
        "loaders": [
          "@angularclass/hmr-loader?pretty=true&prod=false",
          "awesome-typescript-loader",
          "angular2-template-loader"
        ]
      },
      {
          "test": /\.scss|\.css$/,
          loaders: ['to-string-loader', 'style-loader', "css-loader", "sass-loader"]
          // "loader": ExtractTextPlugin.extract({
          //     "fallback": "style-loader",
          //     "use": ["css-loader", "sass-loader"]
          // })
      },
      {
        "test": /\.html$/,
        "loaders": ["html-loader"]
      },
      {
        "test": /\.(ttf|eot|svg|woff|woff2)$/,
        "loader": "file-loader?name=fonts/[name].[ext]"
      }
    ]
  },
  "plugins": [
    // bundle all you styling into one style.css file
    // new ExtractTextPlugin({ "filename": "style.css", "allChunks": true }),

    // create chunks for entries
    new webpack.optimize.CommonsChunkPlugin({
      "name": [
        "client",
        // "vendor",
        "polyfills",
        // "styles"
      ]
    }),

    // // set NODE_ENV
    // new webpack.DefinePlugin({
    //     "process.env": config.dev.env
    // }),

    // needed for setting correct contect
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, "src")
    ),

    // notify on succesfull build
    new WebpackBuildNotifierPlugin({ "title": "build complete" }),

    // Enable Hot module reloading
    new webpack.HotModuleReplacementPlugin(),

    // skip the emitting phase whenever there are errors while compiling
    new webpack.NoEmitOnErrorsPlugin(),

    // Generate HTML on the fly.
    // All chunks created by webpack will be automatically injected
    // If you already have a template file and want to use your own, specify the path on the template property.
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "template": "./src/index.html",
      "inject": true
    }),

    // recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to
    // provide a better Developer Experience
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './src'),
    port: 3000,
    historyApiFallback: true,
    compress: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true
    }
  }
};
