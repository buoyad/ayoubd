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
