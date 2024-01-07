'use client'
import * as React from 'react'
import { fetchAPI, socketAPI } from '../../lib/api'
import { Box } from '../../ui/components'

export default function AdminPage() {
  const [apiHello, setApiHello] = React.useState<string>('loading...')
  React.useEffect(() => {
    async function get() {
      const res = await fetchAPI()
      setApiHello(res)
    }
    get()
  }, [])

  const [ws, setWs] = React.useState<WebSocket | null>(null)
  const [socketMsg, setSocketMsg] = React.useState<string>('nothing yet...')
  React.useEffect(() => {
    const websocket = socketAPI()
    websocket.onmessage = (event) => {
      console.log('Received: ', event.data)
      setSocketMsg(event.data)
    }
    websocket.onopen = () => {
      console.log('Connected')
    }
    websocket.onclose = () => {
      console.log('Disconnected')
    }
    setWs(websocket)

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [])

  return (
    <Box className="content">
      <h1>Admin</h1>
      <p>{apiHello}</p>
      <p>websocket: {socketMsg}</p>
    </Box>
  )
}
