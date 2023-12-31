import Link from 'next/link'
import { Box, Heading, Text } from '../../ui/components'
import { Diorama } from '@/ui/drawings/diorama'

export default function Home() {
  return (
    <Box>
      <Diorama />
      <Heading style={{ paddingTop: 64 }}>Hi, I'm Danny</Heading>

      <Text>
        I'm a software engineer, teacher, and amateur potter based in NYC.
        I've previously worked at <Link href="/work#zoom">Zoom</Link>{' '}
        and <Link href="/work#keybase">Keybase</Link>.
      </Text>
    </Box>
  )
}
