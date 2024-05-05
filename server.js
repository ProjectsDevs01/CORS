const http = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors'); // Import cors package

const proxy = httpProxy.createProxyServer();

// Create a new Express app
const express = require('express');
const app = express();

// Use cors middleware
app.use(cors());

// Proxy server
app.use('/', (req, res) => {
    // Forward request to backend API
    proxy.web(req, res, { target: 'http://98.130.5.88:8080' }); // Make sure to specify the correct target URL
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
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
