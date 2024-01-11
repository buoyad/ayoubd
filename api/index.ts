import express from 'express'
import { createServer } from 'http'
import { createSocketServer } from './src/socket'
import { OpenAIHandler, TestHandler } from './src/chat/openai-handler'
import { serverConfig } from './config'

const { siteURL, testingChat } = serverConfig()

console.log('accepting connections from ' + siteURL)

const Handler = testingChat ? TestHandler : OpenAIHandler

const app = express()
const server = createServer(app)
const wss = createSocketServer('/api', (id, ws) => new Handler(id, ws))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', siteURL)
  next()
})

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API!' })
})

// Upgrade HTTP connection to WebSocket
server.on('upgrade', (request, socket, head) => {
  if (request.headers.origin !== siteURL) {
    console.log('websocket origin not allowed: ' + request.headers.origin)
    socket.destroy()
  }

  if (wss.shouldHandle(request)) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request)
    })
  } else {
    socket.destroy()
  }
})

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})
