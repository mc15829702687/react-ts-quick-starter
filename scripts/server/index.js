const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');

const webpackDevConfig = require('../config/webpack.dev');
const choosePort = require('./chosePort');
const logger = require('./logger');
const { SERVER_HOST, SERVER_PORT } = require('../constant');

// webpack-dev-server
const compiler = Webpack(webpackDevConfig);
const devServerOptions = { ...webpackDevConfig.devServer };
const server = new WebpackDevServer(devServerOptions, compiler);

async function startServer() {
  const resPort = await choosePort(SERVER_HOST, SERVER_PORT);
  try {
    if (resPort !== null) {
      server.listen(resPort, SERVER_HOST, (err) => {
        if (err) {
          return logger.error(err.message);
        }
        logger.start(SERVER_HOST, resPort);
      });
    }
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

startServer();
