import { WebSocketServer, WebSocket, MessageEvent } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { Chatter, Message } from './chat/types'
import { OpenAIChatter } from './chat/openai-chatter'
// import { AyoubdSocket } from './protocol/socket'

// Creates a websocket server that listens at `path`
// and delegates the connection to an instance of `createClient`
export const createSocketServer = (
  path: string,
  createClient: CreateClient
) => {
  const wss = new WebSocketServer({ noServer: true, path })

  const clients: { [id: string]: SocketClient } = {}

  // WebSocket listener
  wss.on('connection', (ws) => {
    const id = uuidv4()
    console.log('connected: ' + id)

    const client = createClient(id, ws)
    clients[id] = client

    ws.onmessage = client.receive
    ws.onclose = () => handleDisconnect(id)

    ws.send(
      JSON.stringify({
        type: 'system',
        message: `assigned id ${id}`,
      })
    )
  })

  const handleDisconnect = (userID: string) => {
    console.log(`disconnected: ${userID}`)
    delete clients[userID]
  }

  return wss
}

// === Client management ===

interface SocketClient {
  receive: (event: MessageEvent) => void
}

type CreateClient = (id: string, ws: WebSocket) => SocketClient

export class ChatClient {
  id: string
  ws: WebSocket
  chatter: Chatter

  _idleTimeoutSeconds = 120
  _idleTimeout: ReturnType<typeof setTimeout> | null = null

  constructor(
    id: string,
    ws: WebSocket,
    ChatterConstructor: (receive: (m: Message) => void) => Chatter
  ) {
    this.id = id
    this.ws = ws
    this.chatter = ChatterConstructor(this.sendFromChatter)
    this.resetIdleTimeout()
  }

  resetIdleTimeout = () => {
    if (this._idleTimeout) {
      clearTimeout(this._idleTimeout)
    }
    if (this.ws.readyState !== this.ws.OPEN) {
      return
    }
    this._idleTimeout = setTimeout(() => {
      console.log(`idle timeout: ${this.id}`)
      this.sendMessage({
        id: '0',
        sender: 'server',
        type: 'system',
        message: 'idle',
      })
      this.ws.close()
    }, this._idleTimeoutSeconds * 1000)
  }

  sendFromChatter = (m: Message) => {
    this.sendMessage(m)
    this.resetIdleTimeout()
  }

  sendMessage = (data: Message) => {
    this.ws.readyState === this.ws.OPEN && this.ws.send(JSON.stringify(data))
  }

  receive = (event: MessageEvent) => {
    this.resetIdleTimeout()
    const message = JSON.parse(event.data.toString())
    this.chatter.status === 'ready' && this.chatter.sendMessage(message.message)
  }
}

export const createOpenAIChatClient: CreateClient = (
  id: string,
  ws: WebSocket
) => new ChatClient(id, ws, (r) => new OpenAIChatter(r))
