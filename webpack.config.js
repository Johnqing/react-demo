const path = require("path");
const webpack = require("webpack");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
//css tree shaking
// const PurifyCSSPlugin = require("purifycss-webpack");

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const INDEX_PATH = path.resolve(SRC_PATH);
const BUILD_PATH = path.resolve(ROOT_PATH, "dist");
module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(INDEX_PATH, "index.js")
  },
  output: {
    path: BUILD_PATH,
    filename: "js/[name].[hash:5].js"
  },
  // 开启dev source map
  devtool: "eval-source-map",
  // 开启 webpack dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true
    //progress: true
  },
  resolve: {
    extensions: [".js", ".jsx"]
    //root: APP_PATH
  },
  module: {
    rules: [
    //   {
    //     test: /\.jsx?$/,
    //     use: [
    //       {
    //         loader: "eslint-loader"
    //       }
    //     ],
    //     include: SRC_PATH,
    //     enforce: "pre"
    //   },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: SRC_PATH,
        exclude: path.resolve(ROOT_PATH, "node_modules")
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'common'
        }
      }
    }
  },
  // 配置plugin
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"'
    }),
    new webpack.ProvidePlugin({
      "React": "react"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {}
    }),
    // new PurifyCSSPlugin({
    //   // 路劲扫描 nodejs内置 路劲检查
    //   paths: glob.sync(path.join(__dirname, "pages/*/*.html"))
    // }),
    // new UglifyJSPlugin({
    //   uglifyOptions: {
    //     // warning: "verbose",
    //     warning: false,
    //     ecma: 7,
    //     beautify: false,
    //     compress: false,
    //     comments: false,
    //     mangle: false,
    //     toplevel: false,
    //     keep_classnames: true,
    //     keep_fnames: true,
    //     // 删除console.log
    //     drop_console: true,
    //     // 内嵌只用了一次的变量
    //     collapse_vars: true,
    //     // 提取出出现多次但是没有定义成变量去引用的静态值
    //     reduce_vars: true
    //   }
    // }),
    new HtmlwebpackPlugin({
      title: "react-webpack-demo",
      filename: "index.html",
      template: path.resolve(SRC_PATH, "templates", "index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeAttributeQuotes: true
      }
    })
  ]
};
