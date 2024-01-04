'use client'
import { useChat } from '@/lib/chat'
import { Box, Button } from '@/ui/components'
import * as React from 'react'

export const ChatThread = () => {
  const { thread, sendMessage, canSend } = useChat()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const [message, setMessage] = React.useState('')

  const onSend = () => {
    sendMessage(message)
    setMessage('')
  }

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      left: 0,
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [thread])

  return (
    <Box className="max-h-64 w-full shrink-0 rounded bg-gray-100 dark:bg-gray-900">
      <Box
        className="w-full overflow-y-auto border-b border-gray-500 p-4"
        ref={scrollRef}
      >
        {thread
          .filter((m) => m.type === 'user')
          .map((message, index) => (
            <Box key={index}>
              {message.sender}: {message.message}
            </Box>
          ))}
      </Box>
      <Box className="w-full shrink-0 p-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-row items-start items-center justify-between gap-2"
        >
          <input
            type="text"
            value={message}
            className="grow p-2 text-gray-900"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            disabled={!canSend || !message.trim()}
            onClick={onSend}
            className=""
          >
            Send
          </Button>
        </form>
      </Box>
    </Box>
  )
}
