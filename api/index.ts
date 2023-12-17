import express from 'express';
import { Server } from 'ws';
import http from 'http';

const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
    // enable cors for local dev
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        next();
    });
}

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

// Start the server
server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});