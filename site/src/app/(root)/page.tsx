import Link from 'next/link'
import { Box, Heading, Text } from '../../ui/components'
import { ColorMode } from '../../ui/theme-context'
import { Orbit } from '@/ui/drawings/orbit'

export default function Home() {
  return (
    <Box>
      <Orbit />
      <Heading>Hi, I'm Danny</Heading>

      <Text>
        I'm a software engineer, teacher, and amateur potter based in NYC.
        I've previously worked at <Link href="/work#zoom">Zoom</Link>{' '}
        and <Link href="/work#keybase">Keybase</Link>.
      </Text>
    </Box>
  )
}
