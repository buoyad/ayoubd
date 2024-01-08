import { SocketHandler, CloseReason } from '../socket'
import { WebSocket, MessageEvent } from 'ws'
import { ChatMessage } from './types'

export class ChatHandler implements SocketHandler {
  id: string
  ws: WebSocket

  #idleTimeoutSeconds = 120
  #idleTimeout?: NodeJS.Timeout

  constructor(id: string, ws: WebSocket) {
    this.id = id
    this.ws = ws
    this.#resetIdleTimeout()
  }
  closed = () => {}

  close = (code?: number, reason?: string) => {
    this.ws.close(code, reason)
  }

  #resetIdleTimeout = () => {
    if (this.#idleTimeout) clearTimeout(this.#idleTimeout)
    this.#idleTimeout = setTimeout(
      () => this.close(CloseReason.idle, 'idle'),
      this.#idleTimeoutSeconds * 1000
    )
  }

  #sendToClient = (data: Object) => {
    this.ws.send(JSON.stringify(data))
  }

  send = (m: ChatMessage) => {
    this.#resetIdleTimeout()
    this.#sendToClient(m)
  }

  onmessage = (evt: MessageEvent) => {} // subclasses should override
}
