const { resolve } = require('path');

const { BannerPlugin, DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PureCssPlugin = require('purgecss-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const dotenv = require('dotenv');

const common = require('./webpack.common');
const paths = require('../paths');
const { shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require('../constant');

// process.env 业务逻辑
const dot = dotenv.config({ path: paths.appProdConfig });
const dotKeys = Object.keys(dot.parsed).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(dot.parsed[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: paths.appBuild,
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      // js 代码压缩
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'],
          },
        },
      }),
      // 优化和压缩 css
      new CssMinimizerPlugin(),
    ].filter(Boolean),
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 去除无用样式
    new PureCssPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body'],
    }),
    // 添加包注释
    new BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by react-ts-quick-starter */',
    }),
    // 打包分析
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server', // 开启一个服务
        analyzerHost: ANALYZER_HOST, // host 设置
        analyzerPort: ANALYZER_PORT, // 端口号设置
      }),
    // 抽离出 css 样式
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    new DefinePlugin(dotKeys),
  ].filter(Boolean),
});
