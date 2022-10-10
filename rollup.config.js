import resolve from "@rollup/plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "@rollup/plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import babel from "rollup-plugin-babel"; // rollup 的 babel 插件，ES6转ES5
import { terser } from "rollup-plugin-terser";
const isDev = process.env.NODE_ENV !== "production";

export default [
  {
    input: "src/main.js",
    output: {
      name: "textEllipsisRuby",
      file: "bundle.js",
      format: "umd",
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**", // 防止打包node_modules下的文件
        runtimeHelpers: true, // 使plugin-transform-runtime生效
      }),
      !isDev && terser(),
    ],
  },
];
