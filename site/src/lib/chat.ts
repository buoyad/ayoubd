'use client'
import * as React from 'react'
import { socketAPI } from './api'
import { usePathname } from 'next/navigation'

type Message = {
  type: 'system' | 'user'
  sender: 'server' | 'client'
  message: string
}

export const useChat = () => {
  // set up websocket and chat thread state
  const [socket, setSocket] = React.useState<WebSocket | null>(null)
  const [thread, setThread] = React.useState<Message[]>([])
  const [canSend, setCanSend] = React.useState(false)

  // watch pathname to disconnect on route change
  const pathname = usePathname()

  const sendMessage = (message: string) => {
    const newMsg = { type: 'user', sender: 'client', message } as const
    setThread((prevChat) => [...prevChat, newMsg])
    if (socket) {
      socket.send(JSON.stringify(newMsg))
    }
  }

  const handleMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data.toString())
    console.log('message: ', message)
    setThread((prevChat) => [
      ...prevChat,
      { type: message.type, sender: 'server', message: message.message },
    ])
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
      console.log('disconnected')
    }
  }

  const checkReadyState = () => {
    if (socket) {
      setCanSend(socket.readyState === socket.OPEN)
    } else {
      setCanSend(false)
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

  return { thread, sendMessage, canSend }
}
