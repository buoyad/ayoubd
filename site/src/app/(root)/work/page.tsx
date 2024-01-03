import { Box, Heading, Text } from '@/ui/components'
import { Metadata } from 'next'
import { ZoomEntry, KeybaseEntry } from './entries'

export const metadata: Metadata = {
  title: 'Work',
}

export default function Page() {
  return (
    <Box className="content">
      <Heading>Work</Heading>
      <Text bold style={{ paddingBottom: '48px' }}>
        You can view my resume (PDF) <a href="/docs/resume.pdf">here</a>
      </Text>
      <Box gap="xxlarge">
        <ZoomEntry />
        <KeybaseEntry />
      </Box>
    </Box>
  )
}
