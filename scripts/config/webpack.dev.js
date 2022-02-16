const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const dotenv = require('dotenv');

const common = require('./webpack.common');
const { SERVER_HOST, SERVER_PORT } = require('../constant');
const paths = require('../paths');

// process.env 业务逻辑
const dot = dotenv.config({ path: paths.appDevConfig });
const dotKeys = Object.keys(dot.parsed).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(dot.parsed[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: SERVER_HOST, // 指定 host，默认是 default
    port: SERVER_PORT, // 指定端口，默认是 8080
    compress: true, // 默认采用 gzip 压缩
    // open: true, // 默认打开浏览器
    hot: true, // 热更新
    client: {
      logging: 'none', // 日志级别
    },
    proxy: { ...require(paths.appProxySetup) },
  },
  stats: 'errors-only', // 只打印错误日志，不打印警告日志
  devtool: 'source-map',
  plugins: [
    // 热更新
    new HotModuleReplacementPlugin(),
    // 页面打印错误
    new ErrorOverlayPlugin(),
    // process.env上赋值默认配置
    new DefinePlugin(dotKeys),
  ],
});
