"use strict";

var _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

module.exports = function (app) {
  app.use('/api', createProxyMiddleware({
    // 👇️ make sure to update your target
    target: 'http://localhost:5000',
    changeOrigin: true
  }));
};