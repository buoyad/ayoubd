import express from 'express';
import { Server } from 'ws';
import { createServer } from 'http';

const app = express();
const server = createServer();

// API endpoints
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from API! Now with github auto deploys. pretty fast!' });
});

app.get('/api/goodbye', (req, res) => {
    res.json({ message: 'Goodbye from API!' });
});

// WebSocket server
const wss = new Server({ noServer: true });

wss.on('connection', (ws, req) => {
    console.log('WebSocket connection established');
    ws.send(JSON.stringify({ message: 'hey' }))
    let count = 0
    const interval = setInterval(() => ws.send(JSON.stringify({ message: `hey ${count++}` })), 1000)

    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send('Hello from WebSocket!');
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
        clearInterval(interval)
    });
});

// Intercept upgrade requests
server.on('upgrade', (req, socket, head) => {
    if (req.url?.startsWith('/api')) {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    } else {
        socket.destroy();
    }
});

// Handle requests
// server.on('request', app);

// Start the server
server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});