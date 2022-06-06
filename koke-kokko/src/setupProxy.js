const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://101.35.225.130:8080',
        pathRewrite: {
            '^/api': '',
        },
        changeOrigin: true,
        secure: false
    }));
}