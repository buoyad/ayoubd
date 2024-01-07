export type Message = {
  id: string
  type: 'system' | 'user'
  sender: 'server' | 'client'
  message: string
}
export interface Chatter {
  sendMessage: (message: string) => void
  receivedMessageCb: (message: Message) => void
  status: 'waiting' | 'ready' | 'error'
}
