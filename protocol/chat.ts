export enum ChatMessageType {
  TEXT = 'text',
  IMAGE = 'image',
}

type TextPayload = {
  type: 'system' | 'user'
  message: string
}

type ImagePayload = {}

type Payload = {
  [ChatMessageType.TEXT]: TextPayload
  [ChatMessageType.IMAGE]: ImagePayload
}

type _ChatPayload<T extends ChatMessageType> = {
  type: T
  payload: Payload[T]
}

type ChatTextPayload = _ChatPayload<ChatMessageType.TEXT>

type ChatImagePayload = _ChatPayload<ChatMessageType.IMAGE>

export type ChatPayload = ChatTextPayload | ChatImagePayload
