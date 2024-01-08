import { WebSocketServer, WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'

export const CloseReason = {
  idle: 3001,
}

// Creates a websocket server that listens at `path`
// and delegates the connection to an instance of `createHandler`
export const createSocketServer = (
  path: string,
  createHandler: CreateHandler
) => {
  const wss = new WebSocketServer({ noServer: true, path })

  const clients: { [id: string]: SocketHandler } = {}

  // WebSocket listener
  wss.on('connection', (ws) => {
    const userID = uuidv4()
    console.log('connected: ' + userID)

    const client = createHandler(userID, ws)
    clients[userID] = client

    ws.onclose = () => handleDisconnect(userID)

    ws.send(
      JSON.stringify({
        type: 'system',
        message: `assigned id ${userID}`,
      })
    )
  })

  const handleDisconnect = (userID: string) => {
    console.log(`disconnected: ${userID}`)
    clients[userID].closed()
    delete clients[userID]
  }

  return wss
}

// === Client management ===

// SocketHandlers must not bind to ws.onclose directly, close() will be called by the server
export interface SocketHandler {
  closed: () => void
}
export type CreateHandler = (id: string, ws: WebSocket) => SocketHandler
