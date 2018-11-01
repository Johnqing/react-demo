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

let mode = 'production';
let plugins = [
  new webpack.ProvidePlugin({
    "React": "react"
  }),
  new webpack.LoaderOptionsPlugin({
    options: {}
  }),
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
];

// 不同环境对应不同的配置
if(process.env.NODE_ENV === 'development'){
  mode = 'development';
  plugins.unshift(new webpack.DefinePlugin({
    "process.env.NODE_ENV": '"development"'
  }))
} else {
  plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        // warning: "verbose",
        warning: false,
        ecma: 7,
        beautify: false,
        compress: false,
        comments: false,
        mangle: false,
        toplevel: false,
        keep_classnames: true,
        keep_fnames: true,
        // 删除console.log
        drop_console: true,
        // 内嵌只用了一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    })
  )
}

// 共有配置
module.exports = {
  mode: mode,
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
      // {
      //   test: /\.jsx?$/,
      //   use: [
      //     {
      //       loader: "eslint-loader"
      //     }
      //   ],
      //   include: SRC_PATH,
      //   enforce: "pre"
      // },
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
    //SplitChunksPlugin配置，其中缓存组概念目前不是很清楚
    splitChunks: {
      // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
      chunks: "async",
      // 表示在压缩前的最小模块大小，默认为0；
      minSize: 3000,
      //表示被引用次数，默认为1
      minChunks: 1,
      //最大的按需(异步)加载次数，默认为1；
      maxAsyncRequests: 3,
      //最大的初始化加载次数，默认为1；
      maxInitialRequests: 3,
      // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
      name: true,
      //缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
      cacheGroups: {
        //缓存组信息，名称可以自己定义
        commons: {
          //拆分出来块的名字,默认是缓存组名称+"~" + [name].js
          // name: "test",
          // 同上
          // chunks: "all",
          // 同上
          // minChunks: 3,
          // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
          enforce: true,
          //test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
          test: ""
        },
        //设置多个缓存规则
        vendor: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          //表示缓存的优先级
          priority: 10,
          enforce: true
        }
      }
    }
  },
  // 配置plugin
  plugins: plugins
};
