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
      this.handleTextMessage(message)
      this.thread.push(new HumanMessage(message.message))
    } else if (message.messageType === 'image') {
      this.handleImageMessage(message)
    }
  }

  sendText = (id: string, content: string, done: boolean) => {
    const m: T.OpenAIStreamingTextMessage = {
      id,
      type: 'user',
      sender: 'server',
      messageType: 'text',
      message: content,
      done,
    }
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
      this.sendText(id, chunk.answer, false)
    }
    this.sendText(id, '', true)
    console.log(`${this.id} sent message: ${fullMessage}`)
    this.thread.push(new AIMessage(fullMessage))
  }

  handleImageMessage = async (message: T.OpenAIImageMessage) => {}
}

const testMessage = 'all work and no play makes jack a dull boy '
export class TestHandler extends ChatHandler {
  intervalID?: NodeJS.Timeout

  constructor(id: string, ws: WebSocket) {
    super(id, ws)
    ws.onmessage = this.onmessage
  }

  onmessage = (evt: MessageEvent) => {
    const message = JSON.parse(evt.data.toString())
    console.log('received: ' + message)
    if (!T.IsOpenAIMessage(message)) return
    if (message.messageType === 'text') {
      this.handleTextMessage(message)
    }
  }

  sendText = (id: string, content: string, done: boolean) => {
    const m: T.OpenAIStreamingTextMessage = {
      id,
      type: 'user',
      sender: 'server',
      messageType: 'text',
      message: content,
      done,
    }
    this.send(m)
  }

  handleTextMessage = (message: T.OpenAIStreamingTextMessage) => {
    const numIterations = Math.floor(Math.random() * 10)
    let iter = 0
    const msgID = uuidv4()
    this.intervalID = setInterval(() => {
      if (iter > numIterations) {
        clearInterval(this.intervalID)
        this.sendText(msgID, '', true)
        return
      }
      this.sendText(msgID, testMessage, false)
      iter++
    }, 200)
  }
}
