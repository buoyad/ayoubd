'use client'
import * as React from 'react'
import { socketAPI } from './api'
import { usePathname } from 'next/navigation'
import debounce from 'lodash/debounce'

type Message = {
  type: 'system' | 'user'
  sender: 'server' | 'client'
  message: string
}

export const maxThreadLength = 10

export const useChat = () => {
  // set up websocket and chat thread state
  const [socket, setSocket] = React.useState<WebSocket | null>(null)
  const [thread, setThread] = React.useState<Message[]>([])
  const [canSend, setCanSend] = React.useState(false)
  const [status, _setStatus] = React.useState<
    'waiting' | 'ready' | 'disconnected' | 'connecting'
  >('connecting')

  const setStatus = React.useCallback(debounce(_setStatus, 100), [])

  // watch pathname to disconnect on route change
  const pathname = usePathname()

  const sendMessage = (message: string) => {
    if (thread.length >= maxThreadLength) {
      disconnect()
      return
    }
    const newMsg = { type: 'user', sender: 'client', message } as const
    setThread((prevChat) => [...prevChat, newMsg])
    if (socket) {
      socket.send(JSON.stringify(newMsg))
      setStatus('waiting')
    }
  }

  const handleMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data.toString())
    console.log('message: ', message)
    setThread((prevChat) => [
      ...prevChat,
      { type: message.type, sender: 'server', message: message.message },
    ])
    if (message.type === 'user') {
      setStatus('ready')
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

  const checkReadyState = () => {
    if (socket?.readyState === socket?.OPEN) {
      setCanSend(true)
      setStatus('ready')
    } else {
      setCanSend(false)
    }
    if (socket?.readyState === socket?.CLOSED) {
      setStatus('disconnected')
    }
  }

  React.useEffect(() => {
    checkReadyState()
  }, [socket?.readyState])

  // connect on mount
  React.useEffect(() => {
    console.log('pathname is', pathname)
    connect()
    return () => disconnect()
  }, [pathname])

  return { thread, sendMessage, canSend: canSend && status === 'ready', status }
}
