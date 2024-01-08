'use client'
import { maxThreadLength, useChat } from '@/lib/chat'
import { Box, Button, Icon, Text } from '@/ui/components'
import * as React from 'react'

const usernames = { server: '@Ai', client: '@You' }

const placeholders = [
  'What can you tell me about Danny?',
  'What professional accomplishment is Danny most proud of?',
  'What does Danny enjoy in his free time?',
]
const randPlaceholder =
  placeholders[Math.floor(Math.random() * placeholders.length)]

export const ChatThread = () => {
  const { thread, sendMessage, canSend, status, isIdle } = useChat()
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

  const userMessages = thread.filter((m) => m.type === 'user')

  return (
    <Box
      className="mb-8 max-h-[500px] w-full shrink-0 scroll-m-4 rounded bg-gray-100 dark:bg-gray-900"
      id="chat"
    >
      <Box
        className="w-full overflow-y-auto border-b border-gray-200 p-4 dark:border-gray-800"
        ref={scrollRef}
      >
        {userMessages.map((message, index) => (
          <Box row className="!items-start" key={index}>
            <Text inline bold className="shrink-0">
              {usernames[message.sender]}:
            </Text>
            <Text inline className="flex-1">
              {message.messageType === 'text' && message.message}
            </Text>
          </Box>
        ))}
        {!userMessages.length && (
          <Text>Ask an AI assistant about my experience</Text>
        )}
        {isIdle && (
          <Text className="italic">
            AI chat is idle. Refresh the page to reconnect.
          </Text>
        )}
      </Box>
      <Box className="w-full shrink-0 px-4 pb-4">
        <Text
          className={
            'text-xs italic ' + (status !== 'ready' ? 'visible' : 'invisible')
          }
        >
          {status === 'connecting' && 'connecting...'}
          {status === 'waiting' && 'waiting for response...'}
          {status === 'disconnected' && 'disconnected'}
          {status === 'ready' && 'ready'}
          {thread.length >= maxThreadLength &&
            `. Threads are limited to ${maxThreadLength} messages.`}
        </Text>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-row items-center justify-between gap-2"
        >
          <input
            type="text"
            value={message}
            placeholder={randPlaceholder}
            className="grow rounded px-2 py-0.5 font-medium text-gray-900"
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === 'disconnected'}
          />
          <Button
            disabled={!canSend || !message.trim()}
            onClick={onSend}
            className=""
          >
            Send
          </Button>
        </form>
        <Box row>
          <Icon name="openai" width={30} height={30} />
          <Box gap="none" className="flex-1 items-start">
            <Text className="text-xs italic">
              Powered by OpenAI and Retrieval Augmented Generation (RAG). This
              chatbot may lie.
            </Text>
            <Text className="text-xs italic">
              UI and model are a work in progress. Last updated 1/6/2023.
              Threads are limited to 10 messages.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
