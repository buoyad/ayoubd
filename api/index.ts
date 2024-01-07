import express from 'express'
import { createServer } from 'http'
import { createOpenAIChatClient, createSocketServer } from './src/socket'
import url from 'url'

const SITE_URL = process.env.SITE_URL
if (!SITE_URL) {
  throw new Error('SITE_URL is not set')
}

console.log('accepting connections from ' + SITE_URL)

const app = express()
const server = createServer(app)
const wss = createSocketServer('/api', createOpenAIChatClient)

// Allow CORS from env.SITE_URL
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', SITE_URL)
  next()
})

// HTTP GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API!' })
})

// Upgrade HTTP connection to WebSocket
server.on('upgrade', (request, socket, head) => {
  if (request.headers.origin !== SITE_URL) {
    console.log('websocket origin not allowed: ' + request.headers.origin)
    socket.destroy()
  }

  const pathname = url.parse(request.url || '').pathname

  if (wss.shouldHandle(request)) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request)
    })
  } else {
    console.log('socket path not allowed: ', pathname, wss.path)
    socket.destroy()
  }
})

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})
