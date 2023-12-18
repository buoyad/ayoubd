import express from 'express';
import { Server as WebSocketServer } from 'ws';
import { createServer } from 'http';
import url from 'url';

const SITE_URL = process.env.SITE_URL;
if (!SITE_URL) {
    throw new Error('SITE_URL is not set');
}

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true, path: '/api' });

// Allow CORS from env.SITE_URL
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin === SITE_URL) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
});

// HTTP GET endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from API!' });
});

// WebSocket listener
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    let count = 1;
    ws.send(JSON.stringify({ message: `connected` }));
    const interval = setInterval(() => {
        ws.send(JSON.stringify({ message: `hey ${count++}` }));
    }, 1000);

    ws.on('close', () => {
        console.log('WebSocket connection closed');
        clearInterval(interval); // Clear interval on connection close
    });
});

// Upgrade HTTP connection to WebSocket
server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url || '').pathname;

    if (pathname === '/api') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});