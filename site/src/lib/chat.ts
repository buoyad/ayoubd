'use client'
import * as React from 'react'
import { socketAPI } from './api'
import { usePathname } from 'next/navigation'
import * as T from '@/protocol/types'

export const maxThreadLength = process.env.NODE_ENV === 'production' ? 10 : 10

const useChatSocket = (onMessage: (evt: T.OpenAIMessage) => void) => {
  const [socket, setSocket] = React.useState<WebSocket | null>(null)
  const [status, setStatus] = React.useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting')
  const [reason, setReason] = React.useState('')

  const onMessageRaw = (evt: MessageEvent) => {
    if (typeof evt.data !== 'string') return
    const messageObj = JSON.parse(evt.data)
    if (!T.IsOpenAIMessage(messageObj)) return
    onMessage(messageObj)
  }

  const socketSend = (message: T.OpenAIMessage) => {
    socket?.send(JSON.stringify(message))
  }

  const disconnect = () => {
    socket?.close()
  }

  React.useEffect(() => {
    const socket = socketAPI()

    socket.onopen = () => {
      setStatus('connected')
    }
    socket.onclose = (ev: CloseEvent) => {
      setReason(ev.reason)
      setStatus('disconnected')
    }
    socket.onmessage = onMessageRaw

    setSocket(socket)
    return () => socket.close()
  }, [])

  return { status, reason, socketSend, disconnect }
}

export const useChat = () => {
  const [thread, setThread] = React.useState<T.OpenAIMessage[]>([])
  const [waiting, setWaiting] = React.useState(false)
  const { status, reason, socketSend, disconnect } = useChatSocket(
    (message: T.OpenAIMessage) => {
      if (message.messageType !== 'text') {
        return
      }
      setThread((prevChat) => {
        const res = [...prevChat]
        if (!!res.length && res[res.length - 1]?.id === message.id) {
          const prevMessage = res[
            res.length - 1
          ] as T.OpenAIStreamingTextMessage
          prevMessage.message += message.message
          prevMessage.done = message.done
        } else {
          res.push(message)
        }
        return res
      })
      setWaiting(!message.done)
    },
  )

  const sendMessage = (message: string) => {
    const newMsg: T.OpenAIStreamingTextMessage = {
      id: thread.length.toString(),
      type: 'user',
      messageType: 'text',
      sender: 'client',
      message,
      done: true,
    }
    setThread((prevChat) => [...prevChat, newMsg])
    socketSend(newMsg)
    setWaiting(true)
  }

  React.useEffect(() => {
    if (thread.length >= maxThreadLength && !waiting) {
      disconnect()
    }
  }, [thread, waiting])

  return {
    sendMessage,
    thread,
    waiting,
    status,
    idle: reason === 'idle',
  }
}
