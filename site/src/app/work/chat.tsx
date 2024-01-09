'use client'
import * as React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { maxThreadLength, useChat } from '@/lib/chat'
import { Box, Button, Icon, Text } from '@/ui/components'
import * as T from '@/protocol/types'
import {
  AnimatePresence,
  LazyMotion,
  Variants,
  domAnimation,
  m,
} from 'framer-motion'

const usernames = { server: '@Ai', client: '@You' }

const placeholders = [
  'What can you tell me about Danny?',
  'What professional accomplishment is Danny most proud of?',
  'What does Danny enjoy in his free time?',
]
const randPlaceholder =
  placeholders[Math.floor(Math.random() * placeholders.length)]

export const ChatThread = () => {
  const { sendMessage, thread, waiting, status, idle } = useChat()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const canSend = !waiting && status === 'connected'

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      left: 0,
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [thread])

  const userMessages = thread.filter((m) => m.type === 'user')

  let messageInProgress: string | undefined = undefined
  const lastMessage = thread[thread.length - 1]
  if (lastMessage && lastMessage.messageType === 'text' && !lastMessage.done) {
    messageInProgress = lastMessage.id
  }

  return (
    <Box className="mb-8 w-full shrink-0 scroll-m-4" id="chat">
      <Box className="max-h-[500px] w-full shrink-0 rounded bg-gray-100 dark:bg-gray-900">
        <Box
          className="w-full overflow-y-auto border-b border-gray-200 p-4 dark:border-gray-800"
          ref={scrollRef}
        >
          {userMessages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              inProgress={message.id === messageInProgress}
            />
          ))}
          {waiting && !messageInProgress && <Waiting className="ml-4" />}
          {!userMessages.length && (
            <Text>Ask an AI assistant about my experience</Text>
          )}
          {idle && <Text className="italic">refresh to reconnect</Text>}
        </Box>
        <ChatInput
          status={status}
          thread={thread}
          sendMessage={sendMessage}
          canSend={canSend}
        />
      </Box>
    </Box>
  )
}

const ChatMessage = ({
  message,
  inProgress,
}: {
  message: T.OpenAIMessage | 'placeholder'
  inProgress?: boolean
}) => {
  const content =
    message === 'placeholder' ? (
      <>
        <Text inline bold className="shrink-0">
          {usernames.server}:
        </Text>
        <Text inline className="flex-1">
          Waiting for message...
        </Text>
      </>
    ) : (
      <>
        <Text inline bold className="shrink-0">
          {usernames[message.sender]}:
        </Text>
        <Text inline className="flex-1">
          {message.messageType === 'text' &&
            message.message.replace('\n', '<br/>')}
          {inProgress && <Waiting className="ml-2" />}
        </Text>
      </>
    )

  return (
    <Box row className="!items-start">
      {content}
    </Box>
  )
}

type ChatInputProps = Pick<
  ReturnType<typeof useChat>,
  'status' | 'thread' | 'sendMessage'
> & { canSend: boolean }
const ChatInput = ({
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
      <Text
        className={
          'text-xs italic ' + (status !== 'connected' ? 'visible' : 'invisible')
        }
      >
        {status === 'connecting' && 'connecting...'}
        {status === 'disconnected' && 'disconnected'}
        {status === 'connected' && 'ready'} {/* preserve height */}
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
          UI and model are a work in progress. Last updated 1/9/2023. Threads
          are limited to 10 messages.
        </Text>
      </Box>
    </Box>
  )
}

const Waiting = ({ className }: { className?: string }) => {
  const parent: Variants = {
    bounce: {
      transition: { staggerChildren: 0.1 },
    },
  }
  const dots: Variants = {
    bounce: {
      y: [0, -5, 0, 0],
      transition: {
        repeat: Infinity,
        bounce: 0.25,
        duration: 1,
        times: [0, 0.3, 0.7, 1],
      },
    },
  }
  return (
    <LazyMotion features={domAnimation}>
      <div className={`inline-block ${className ?? ''}`}>
        <m.div
          variants={parent}
          animate="bounce"
          className="flex flex-row items-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <m.div
              key={i}
              variants={dots}
              className="h-2 w-2 rounded-xl bg-gray-300 dark:bg-gray-700"
            />
          ))}
        </m.div>
      </div>
    </LazyMotion>
  )
}

const Explanation = () => {
  return (
    <AnimatePresence>
      <Accordion.Root
        type="single"
        collapsible
        className="w-full shrink-0 px-4 py-4"
      >
        <Accordion.Item value="1">
          <Accordion.Trigger>Tell me more</Accordion.Trigger>
          <Accordion.Content asChild>
            <m.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Tell me more about how this works
            </m.div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </AnimatePresence>
  )
}
