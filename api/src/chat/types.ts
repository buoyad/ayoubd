// === Base socket messages ===

export interface ChatMessage {
  id: string
  type: 'system' | 'user'
  sender: 'client' | 'server'
}

export const IsChatMessage = (obj: any): obj is ChatMessage => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'type' in obj &&
    'sender' in obj
  )
}

// === OpenAI handler messages ===

export interface OpenAIStreamingTextMessage extends ChatMessage {
  messageType: 'text'
  message: string
  done: boolean
}

export interface OpenAIImageMessage extends ChatMessage {
  messageType: 'image'
  data: string
}

export type OpenAIMessage = OpenAIStreamingTextMessage | OpenAIImageMessage

export const IsOpenAIMessage = (obj: any): obj is OpenAIMessage => {
  return IsChatMessage(obj) && 'messageType' in obj
}
