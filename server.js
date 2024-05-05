const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

// Proxy server
const server = http.createServer((req, res) => {
    // Forward request to backend API
    proxy.web(req, res, { target: '98.130.5.88:8080' });
});

// Error handling for proxy
proxy.on('error', (err, req, res) => {
    console.error(err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Proxy Error');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
