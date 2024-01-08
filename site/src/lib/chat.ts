'use client'
import * as React from 'react'
import { socketAPI } from './api'
import { usePathname } from 'next/navigation'
import * as T from '@/protocol/types'
import debounce from 'lodash/debounce'

export const maxThreadLength = process.env.NODE_ENV === 'production' ? 10 : 100

export const useChat = () => {
  // set up websocket and chat thread state
  const [socket, setSocket] = React.useState<WebSocket | null>(null)
  const [thread, setThread] = React.useState<T.OpenAIMessage[]>([])
  const [canSend, setCanSend] = React.useState(false)
  const [status, _setStatus] = React.useState<
    'waiting' | 'ready' | 'disconnected' | 'connecting' | 'idle'
  >('connecting')

  const setStatus = React.useCallback(debounce(_setStatus, 100), [])

  // watch pathname to disconnect on route change
  const pathname = usePathname()

  const sendMessage = (message: string) => {
    if (thread.length >= maxThreadLength) {
      disconnect()
      return
    }
    const newMsg: T.OpenAIStreamingTextMessage = {
      id: thread.length.toString(),
      type: 'user',
      messageType: 'text',
      sender: 'client',
      message,
      done: true,
    }
    setThread((prevChat) => [...prevChat, newMsg])
    if (socket) {
      socket.send(JSON.stringify(newMsg))
      setStatus('waiting')
    }
  }

  const handleMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data.toString())
    if (!T.IsOpenAIMessage(message)) return
    if (message.messageType !== 'text') {
      // only text handled right now
      return
    }
    setThread((prevChat) => {
      const res = [...prevChat]
      if (res.length > 1 && res[res.length - 1]?.id === message.id) {
        const prevMessage = res[res.length - 1] as T.OpenAIStreamingTextMessage
        prevMessage.message += message.message
        prevMessage.done = message.done
      } else {
        res.push(message)
      }
      return res
    })
    if (message.done) {
      setStatus('ready')
    } else {
      setStatus('waiting')
    }
    if (thread.length >= maxThreadLength) {
      disconnect()
    }
  }

  const connect = () => {
    const socket = socketAPI()
    socket.onmessage = handleMessage
    socket.onclose = checkReadyState
    setSocket(socket)
  }

  // disconnect from websocket server
  const disconnect = () => {
    if (socket) {
      socket.close()
      setCanSend(false)
      setStatus('disconnected')
    }
  }

  const checkReadyState = (ev?: CloseEvent) => {
    if (ev) {
      console.log(`socket closed: ${ev.code} ${ev.reason}`)
      if (ev.reason === 'idle') {
        setStatus('idle')
      }
    }
    if (socket?.readyState === socket?.OPEN) {
      setCanSend(true)
      setStatus('ready')
    } else {
      setCanSend(false)
    }
    if (socket?.readyState && socket?.readyState === socket?.CLOSED) {
      setStatus('disconnected')
    }
  }

  React.useEffect(() => {
    checkReadyState()
  }, [socket?.readyState])

  // connect on mount
  React.useEffect(() => {
    // console.log('pathname is', pathname)
    connect()
    return () => disconnect()
  }, [pathname])

  return { thread, sendMessage, canSend: canSend && status === 'ready', status }
}
