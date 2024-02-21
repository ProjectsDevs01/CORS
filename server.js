const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

// Proxy API requests
app.use('/api', (req, res) => {
    proxy.web(req, res, { target: 'http://3.106.227.95:8080' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Reverse proxy server running on port ${PORT}`);
});
