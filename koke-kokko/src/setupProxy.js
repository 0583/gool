const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://198.18.0.1:8080',
        pathRewrite: {
            '^/api': '',
        },
        changeOrigin: true,
        secure: false
    }));
}