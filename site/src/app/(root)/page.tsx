import * as React from 'react'
import Link from 'next/link'
import { Box, Heading, Text } from '../../ui/components'
import Diorama from './diorama-loader'
import { styleSheet } from '@/ui/util'

export default function Home() {
  return (
    <Box className="content" gap="large" style={styles.container}>
      <Box style={styles.innerGrid}>
        <Diorama />
        <Box>
          <Heading style={{ paddingTop: 64 }}>Hi, I'm Danny</Heading>
          <Text>
            I'm a software engineer, teacher, and amateur potter based in NYC.
            I've previously worked at <Link href="/work#zoom">Zoom</Link>{' '}
            and <Link href="/work#keybase">Keybase</Link>.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

const styles = styleSheet({
  container: {
    display: 'grid',
    gridColumn: '1 / -1',
    padding: '4rem 0 0',
    columnGap: 'var(--content-padding-horizontal)',
    gridTemplateColumns: '1fr min(calc(100vw - 2*var(--content-padding-horizontal)), 110ch) 1fr',
  },
  innerGrid: {
    display: 'grid',
    gridColumn: 2,
    columnGap: '32px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  }
})
