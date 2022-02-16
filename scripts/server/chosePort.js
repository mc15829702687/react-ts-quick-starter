const detect = require('detect-port');
const isRoot = require('is-root');
const chalk = require('chalk');

// 是否运行在终端
const isInteractive = process.stdout.isTTY;

async function choosePort(host, port) {
  const resPort = await detect(port, host);
  if (resPort === port) {
    return resPort;
  }
  const message =
    process.platform !== 'win32' && port < 1024 && !isRoot()
      ? 'Admin permissions are required to run a server on a port below 1024.'
      : `Something is already running on port ${port}.`;

  if (isInteractive) {
    console.log(chalk.yellow(message));
    return resPort;
  }

  console.log(chalk.red(message));
  return null;
}

module.exports = choosePort;
