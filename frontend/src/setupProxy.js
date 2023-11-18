const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function(app) {
    console.log("register middleware")
    app.use(createProxyMiddleware('/api/v1', { target: 'http://192.168.0.11:5000' }))
}
