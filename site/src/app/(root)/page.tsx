import * as React from 'react'
import Link from 'next/link'
import { Box, Heading, Text } from '../../ui/components'

const Diorama = React.lazy(() => import('@/ui/drawings/diorama').then((m) => ({ default: m.Diorama })))

export default function Home() {
  return (
    <Box>
      <React.Suspense fallback={<p>loading...</p>}>
        <Diorama />
      </React.Suspense>
      <Heading style={{ paddingTop: 64 }}>Hi, I'm Danny</Heading>

      <Text>
        I'm a software engineer, teacher, and amateur potter based in NYC.
        I've previously worked at <Link href="/work#zoom">Zoom</Link>{' '}
        and <Link href="/work#keybase">Keybase</Link>.
      </Text>
    </Box>
  )
}
