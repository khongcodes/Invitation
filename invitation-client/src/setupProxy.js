const proxy = require('http-proxy-middleware');
const chi = '719a610df11e5fbabdf3c4290515d014';

module.exports = function(app) {
  app.use(proxy('/forecast', { target: 'http://api.darksky.net', changeOrigin: true }));
}