// 基于Webpack2 构建
console.info(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;
  case 'development':
  default:
    module.exports = require('./config/webpack.dev');
}