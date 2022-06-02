const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://202.120.40.82:11233',
        pathRewrite: {
            '^/api': '',
        },
        changeOrigin: true,
        secure: false
    }));

}