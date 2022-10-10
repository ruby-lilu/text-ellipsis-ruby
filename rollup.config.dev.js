import resolve from "@rollup/plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "@rollup/plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import babel from "rollup-plugin-babel"; // rollup 的 babel 插件，ES6转ES5
import livereload from "rollup-plugin-livereload"; // 开启热更新
import serve from "rollup-plugin-serve";

export default [
  {
    input: "src/main.js",
    output: {
      name: "textEllipsisRuby",
      file: "lib/bundle-dev.js",
      format: "umd",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**", // 防止打包node_modules下的文件
        runtimeHelpers: true, // 使plugin-transform-runtime生效
      }),
      livereload(),
      serve({
        open: true, // 是否打开浏览器
        contentBase: "./public", // 入口html的文件位置
        historyApiFallback: true, // Set to true to return index.html instead of 404
        host: "localhost",
        port: 10001,
      }),
    ],
  },
];
