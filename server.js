const app = require('./app'); // Import the configured app
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');

dotenv.config();

// Load the self-signed certificate and key
const sslOptions = {
    key: fs.readFileSync('private.key'), // Path to your private key
    cert: fs.readFileSync('certificate.crt'), // Path to your certificate
};

const PORT = process.env.PORT || 3000;

// Start HTTPS server
https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on https://cjinyeong.duckdns.org:13030`);
});