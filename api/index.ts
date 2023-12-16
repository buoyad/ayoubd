import express from 'express';
import { Server } from 'ws';
import http from 'http';

const app = express();
const server = http.createServer(app);

// API endpoints
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from API! Now with github auto deploys. pretty fast!' });
});

app.get('/api/goodbye', (req, res) => {
    res.json({ message: 'Goodbye from API!' });
});

// WebSocket server
const wss = new Server({ server, path: '/api' });

wss.on('connection', (ws, req) => {
    console.log('WebSocket connection established');
    ws.send(JSON.stringify({ message: 'hey' }))

    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send('Hello from WebSocket!');
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Start the server
server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});