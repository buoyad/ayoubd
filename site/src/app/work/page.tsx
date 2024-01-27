import { Box, Heading, Text } from '@/ui/components'
import { Metadata } from 'next'
import { ZoomEntry, KeybaseEntry, FreelanceEntry } from './entries'
import { ChatThread } from './chat'

export const metadata: Metadata = {
  title: 'Work',
}

export default function Page() {
  return (
    <Box className="content">
      <Heading>Work</Heading>
      <ChatThread />
      <Text bold className="pb-10">
        You can view my resume (PDF) <a href="/docs/resume.pdf">here</a>
      </Text>
      <Box gap="xxlarge">
        <ZoomEntry />
        <KeybaseEntry />
        <FreelanceEntry />
      </Box>
    </Box>
  )
}
