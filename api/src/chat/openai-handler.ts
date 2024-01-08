import { ChatHandler } from './handler'
import * as T from './types'
import { WebSocket, MessageEvent } from 'ws'
import {
  createOpenAIChain,
  HumanMessage,
  AIMessage,
  Thread,
} from '../ai/openai-chain'
import { v4 as uuidv4 } from 'uuid'

export class OpenAIHandler extends ChatHandler {
  thread: Thread = []
  llmChain = createOpenAIChain()

  constructor(id: string, ws: WebSocket) {
    super(id, ws)
    ws.onmessage = this.onmessage
  }

  onmessage = (evt: MessageEvent) => {
    const message = JSON.parse(evt.data.toString())
    if (!T.IsOpenAIMessage(message)) return

    if (message.messageType === 'text') {
      this.thread.push(new HumanMessage(message.message))
      this.handleTextMessage(message)
    } else if (message.messageType === 'image') {
      this.handleImageMessage(message)
    }
  }

  sendText = (m: T.OpenAIStreamingTextMessage) => {
    this.send(m)
  }

  handleTextMessage = async (message: T.OpenAIStreamingTextMessage) => {
    console.log(`${this.id} received message: ${message.message}`)
    const chain = await this.llmChain
    const stream = await chain.stream({
      input: message.message,
      chat_history: this.thread,
    })

    const id = uuidv4()
    let fullMessage = ''
    for await (const chunk of stream) {
      if (!chunk.answer) continue
      fullMessage += chunk.answer
      this.sendText({
        id,
        type: 'user',
        sender: 'server',
        messageType: 'text',
        message: chunk.answer,
        done: false,
      })
    }
    this.sendText({
      id,
      type: 'user',
      sender: 'server',
      messageType: 'text',
      message: '',
      done: true,
    })
    console.log(`${this.id} sent message: ${fullMessage}`)
    this.thread.push(new AIMessage(fullMessage))
  }

  handleImageMessage = async (message: T.OpenAIImageMessage) => {}
}
