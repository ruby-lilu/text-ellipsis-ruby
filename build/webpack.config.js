let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let root = path.resolve(__dirname, "../");

module.exports = {
  mode: "development",
  entry: root + "/test/index.js",
  output: {
    path: root + "/",
    filename: "dist/bundle.js",
    publicPath: "/",
  },
  devtool: "source-map",
  watchOptions: {
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300,
    // 不监听的文件或文件夹
    ignored: ["**/node_modules", "**/types"],
    stdin: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: "/node_modules/",
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },

      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|bmp|ico)$/,
        type: "asset", // asset 资源类型可以根据指定的图片大小来判断是否需要将图片转化为 base64
        parser: {
          // 转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: "assets/images/[name]-[hash:6].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset",
        generator: {
          filename: "assets/fonts/[name]-[hash:6].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root + "/test/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 9596,
    open: true,
    compress: true,
    historyApiFallback: true,
    onListening: (devServer) => {
      const port = devServer.server.address().port;
      console.log("AIoT Web Listening on port:", port);
    },
  },
};
