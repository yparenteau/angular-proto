const webpack = require("webpack")
const path = require("path")
const config = require("./config")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    "cache": true,
    "entry": {
        "polyfills": path.join(__dirname, "..", "src", "polyfills.ts"),
        "vendor": path.join(__dirname, "..", "src", "vendor.ts"),
        "client": path.join(__dirname, "..", "src", "app", "root.ts"),
        "styles": path.join(__dirname, "..", "src", "styles", "style.root.scss")
    },
    "output": {
        "filename": "[name].js",
        "path": config.build.assetsRoot,
        "publicPath": process.env.NODE_ENV === "production"
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    "resolve": {
        "extensions": [".ts", ".js"]
    },
    "module": {
        "rules": [
            {
                "test": /\.ts$/,
                "loaders": [
                    {
                        "loader": "awesome-typescript-loader",
                        "options": {
                            // specify your tsconfig.json file
                            "configFileName": path.join(__dirname, "..", "tsconfig.json")
                        }
                    },
                    "angular2-template-loader"
                ]
            },
            {
                "test": /\.scss|\.css$/,
                "loader": ExtractTextPlugin.extract({
                    "fallback": "style-loader",
                    "use": ["css-loader", 
                        {
                            "loader": "sass-loader"
                        }]
                })
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
        new ExtractTextPlugin({ "filename": "style.css", "allChunks": true }),
        
        // create chunks for entries
        new webpack.optimize.CommonsChunkPlugin({
            "name": ["client", "vendor", "polyfills", "styles"]
        }),
    ],

    devServer: {
        hot: true,
        contentBase: path.join(process.cwd(), './src'),
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        compress: true,
        stats: {
            colors: true,
            chunks: false,
            'errors-only': true
        }
    }
    // setup: fakeServer,
    // proxy: {
    //   '/chl-services': {
    //     // target: "http://10.214.48.113:8097",
    //     // target: "http://l101ist11w9709.ams.bnymellon.net:8080",
    //     target: 'https://chl.dev.bnymellon.com',
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
}
