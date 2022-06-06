const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://198.18.0.1:8080',
        // target: 'http://101.35.225.130:8080',
        pathRewrite: {
            '^/api': '',
        },
        changeOrigin: true,
        secure: false
    }));

    app.use(createProxyMiddleware('/webaas', {
        target: 'http://202.120.40.82:11233',
        pathRewrite: {
            '^/webaas': '',
        },
        changeOrigin: true,
        secure: false,
    }))
}
