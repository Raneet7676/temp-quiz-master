const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const server = http.createServer((req, res) => {
    // Serve the HTML file
    if (req.method === 'GET' && req.url === '/') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading page.');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    // Handle form POST data
    else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const userData = {
                firstName: formData.get('f_name'),
                lastName: formData.get('l_name'),
                email: formData.get('mail'),
                timestamp: new Date()
            };

            const dataFile = path.join(__dirname, 'data.json');
            let existingData = [];

            if (fs.existsSync(dataFile)) {
                const raw = fs.readFileSync(dataFile);
                existingData = JSON.parse(raw || '[]');
            }

            existingData.push(userData);

            fs.writeFileSync(dataFile, JSON.stringify(existingData, null, 2));

            // Respond to user
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h2>Thank you for registering!</h2>
                <p>Your info has been saved.</p>
                <a href="/">Go Back</a>
            `);
        });
    }

    // Handle 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
