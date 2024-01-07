import { ChatPayload } from './chat'

enum MessageType {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHAT = 'chat',
}

type ConnectPayload = {
  userid: string
}
type DisconnectPayload = {
  reason: string
}

type MessagePayload = {
  [MessageType.CONNECT]: ConnectPayload
  [MessageType.DISCONNECT]: DisconnectPayload
  [MessageType.CHAT]: ChatPayload
}

type Message<T extends MessageType> = {
  type: T
  sender: 'server' | 'client'
  senderID: string
  payload: MessagePayload[T]
}

export type AllMessages = Message<MessageType>

// === Attaching types to base WebSockets ===

// Interface compatible with ws.WebSocket and base WebSocket

export class AyoubdSocket {
  ws: WebSocket
  onmessage: ((event: MessageEvent<AllMessages>) => void) | null
  onclose: ((event: CloseEvent) => void) | null

  constructor(ws: WebSocket) {
    this.ws = ws
    this.onmessage = null
    this.onclose = null
    this.ws.onmessage = this.handleMessage
    this.ws.onclose = this.handleClose
  }

  sendMessage(message: AllMessages) {
    this.ws.send(JSON.stringify(message))
  }

  handleMessage(event: MessageEvent<AllMessages>) {
    if (this.onmessage) {
      this.onmessage(event)
    }
  }

  handleClose(event: CloseEvent) {
    if (this.onclose) {
      this.onclose(event)
    }
  }
}
