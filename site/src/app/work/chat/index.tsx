'use client'
import * as React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { useChat } from '@/lib/chat'
import { Box, Button, Icon, Text } from '@/ui/components'
import * as T from '@/protocol/types'
import { ChatInput, Status } from './input'
import { Waiting } from './waiting'
import { AnimatePresence, m } from 'framer-motion'

const usernames = { server: '@Ai', client: '@You' }

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
          <Box row className="w-full items-center justify-center">
            <Status status={status} idle={idle} />
          </Box>
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
  const messageText =
    typeof message === 'object' && message.messageType === 'text'
      ? message.message.split('\n')
      : ''
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
          {!!messageText &&
            messageText.map((text, index, arr) => (
              <React.Fragment key={index}>
                <Text>{text}</Text>
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
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
