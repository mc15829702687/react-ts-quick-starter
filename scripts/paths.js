const fs = require('fs');
const path = require('path');

// 获取执行的工作目录
const appDirectory = fs.realpathSync(process.cwd());

/**
 * 从相对路径解析绝对路径
 * @param {*} relativePath
 */
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// 默认模块扩展名
const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx'];

/**
 * 解析模块路径
 * @param {*} resolveFn
 * @param {*} resolvePath
 */
function resolveModule(resolveFn, resolvePath) {
  // 检测文件扩展名是否存在
  const extension = moduleFileExtensions.find((ex) => fs.existsSync(resolveFn(`${resolvePath}.${ex}`)));

  if (extension) {
    return resolveFn(`${resolvePath}.${extension}`);
  }
  return resolveFn(`${resolvePath}.ts`);
}

module.exports = {
  appBuild: resolveApp('dist'), // output path
  appHtml: resolveApp('public/index.html'),
  appIndex: resolveModule(resolveApp, 'src/index'), // entry path
  appProxySetup: resolveModule(resolveApp, 'src/setProxy'),
  appSrc: resolveApp('src'),
  appSrcComponents: resolveApp('src/components'),
  appUtils: resolveApp('src/utils'),
  appPublic: resolveApp('public'),
  appTsConfig: resolveApp('tsconfig.json'),
  appDevConfig: resolveApp('.env.development'),
  appProdConfig: resolveApp('.env.product'),
};
