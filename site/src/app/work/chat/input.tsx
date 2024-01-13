'use client'
import * as React from 'react'
import { Box, Text, Icon, Button } from '@/ui/components'
import { useChat, maxThreadLength } from '@/lib/chat'
import { LazyMotion, Variants, domAnimation, m } from 'framer-motion'

type ChatInputProps = Pick<
  ReturnType<typeof useChat>,
  'status' | 'thread' | 'sendMessage'
> & { canSend: boolean }
export const ChatInput = ({
  status,
  thread,
  sendMessage,
  canSend,
}: ChatInputProps) => {
  const [message, setMessage] = React.useState('')

  const onSend = () => {
    sendMessage(message)
    setMessage('')
  }

  return (
    <Box className="w-full shrink-0 px-4 pb-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full flex-row items-center justify-between gap-2"
      >
        <input
          type="text"
          value={message}
          placeholder="Ask a question..."
          className="grow rounded px-2 py-0.5 font-medium text-gray-900"
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === 'disconnected'}
          autoFocus
        />
        <Button
          disabled={!canSend || !message.trim()}
          onClick={onSend}
          className=""
        >
          Send
        </Button>
      </form>
      <PoweredBy />
    </Box>
  )
}

const PoweredBy = () => {
  return (
    <Box row>
      <Icon name="openai" width={30} height={30} />
      <Box gap="none" className="flex-1 items-start">
        <Text className="text-xs italic">
          Powered by OpenAI and Retrieval Augmented Generation (RAG). This
          chatbot may lie.
        </Text>
        <Text className="text-xs italic">
          UI and model are a work in progress. Last updated 1/12/2023. Threads
          are limited to 10 messages.
        </Text>
      </Box>
    </Box>
  )
}

export const Status = ({
  status,
  idle,
}: Pick<ReturnType<typeof useChat>, 'status' | 'idle'>) => {
  const parent: Variants = {
    connecting: {
      opacity: 0.7,
      transition: { staggerChildren: 0.1 },
    },
    connected: {
      opacity: 1,
    },
    disconnected: { opacity: 0.7 },
  }
  const ring: Variants = {
    connecting: {
      strokeLinecap: 'inherit',
      pathLength: [0, 1],
      pathOffset: [0, 1],
      transition: { repeat: Infinity, duration: 1 },
    },
    connected: {
      pathLength: 1,
      pathOffset: 0,
      strokeLinecap: 'round',
    },
    disconnected: {
      pathLength: 1,
      pathOffset: 0,
      strokeLinecap: 'round',
    },
  }
  const check: Variants = {
    connecting: { strokeLinecap: 'inherit', pathLength: 0 },
    connected: { strokeLinecap: 'round', pathLength: 1 },
    disconnected: { strokeLinecap: 'inherit', pathLength: 0 },
  }
  return (
    <Box gap="small" className="!items-center">
      <LazyMotion features={domAnimation}>
        <m.svg
          width="96"
          height="96"
          viewBox="0 0 22 22"
          fill="none"
          variants={parent}
          opacity={0}
          animate={status}
          xmlns="http://www.w3.org/2000/svg"
        >
          <m.path
            variants={ring}
            d="M2.94745 7.11485L8.1567 2.94745L13.3659 7.11485"
            className="stroke-gray-800 dark:stroke-gray-300"
          />
          <m.path
            variants={ring}
            d="M3.60907 16.0311L2.60463 9.43604L8.81832 7.0084"
            className="stroke-gray-800 dark:stroke-gray-300"
          />
          <m.path
            variants={ring}
            d="M11.6616 19.9163L5.44793 17.4887L6.45238 10.8936"
            className="stroke-gray-800 dark:stroke-gray-300"
          />
          <m.path
            variants={ring}
            d="M19.0526 14.8852L13.8433 19.0526L8.63408 14.8852"
            className="stroke-gray-800 dark:stroke-gray-300"
          />
          <m.path
            variants={ring}
            d="M18.3909 5.96885L19.3954 12.5639L13.1817 14.9915"
            className="stroke-gray-800 dark:stroke-gray-300"
          />
          <m.path
            variants={ring}
            d="M10.3384 2.0837L16.5521 4.51134L15.5476 11.1064"
            className="stroke-gray-800 dark:stroke-gray-300"
          />
          <m.path
            variants={check}
            d="M6.5 8.5L11 12L19.5 3"
            stroke="#72FF8D"
            stroke-opacity="1"
            strokeWidth={3}
          />
        </m.svg>
      </LazyMotion>
      <Text bold className="text-gray-600 dark:text-gray-400">
        {status}
        {status === 'connecting' && '...'}
        {idle && ' (idle)'}
      </Text>
    </Box>
  )

  return (
    <Text
      className={
        'text-xs italic ' + (status !== 'connected' ? 'visible' : 'invisible')
      }
    >
      {status === 'connecting' && 'connecting...'}
      {status === 'disconnected' && 'disconnected'}
      {status === 'connected' && 'ready'} {/* preserve height */}
    </Text>
  )
}
