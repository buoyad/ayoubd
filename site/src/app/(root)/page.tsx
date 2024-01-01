import * as React from 'react'
import Link from 'next/link'
import { Box, Heading, Icon, Text } from '../../ui/components'
import Diorama from './diorama-loader'
import { styleSheet } from '@/ui/util'
import meJPG from '@/../public/images/me_sq.jpeg'
import Image from 'next/image'

export default function Home() {
  return (
    <Box className="content" gap="large" style={styles.container}>
      <Box style={styles.innerGrid}>
        <Box row style={styles.warningText}>
          <Icon name="warning" strokeWidth={0} fill="#ffdd00" />
          <Text>
            I am in the process of migrating content from my old website to this new one.<br />Please excuse the mess.
          </Text>
        </Box>
        <Image
          src={meJPG}
          style={styles.profilePic}
          alt={`An image of Danny Ayoub, a man with short black hair and glasses, smiling at the camera sitting at a brown wooden table. His elbows are resting on the table and his arms are crossed. A few tall landscaping trees stand in the background.`} />
        <Box>
          <Heading>Hi, I'm Danny</Heading>
          <Text>
            I'm a software engineer, teacher, and amateur potter based in NYC.
          </Text>
          <Text>
            I specialize in product and front-end development for high security applications.
            I create usable, secure-by-default software that respects user privacy and is delightful to use.
          </Text>
          <Text>
            I've previously worked at <Link href="/work#zoom">Zoom</Link>{' '}
            and <Link href="/work#keybase">Keybase</Link>.
          </Text>
          <Text>
            I currently work on personal projects and experiments under the company I started, <Link href="https://scratchingpost.net" target="_blank">Scratching Post</Link>.
          </Text>
        </Box>
        <Diorama />
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
  warningText: {
    gridColumn: '1/ -1',
    placeSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  innerGrid: {
    display: 'grid',
    gridColumn: 2,
    columnGap: '32px',
    rowGap: '64px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(30ch, 1fr))',
  },
  profilePic: {
    width: '100%',
    height: 'unset',
    objectFit: 'cover',
    borderRadius: '4px',
    boxShadow: '2px 2px 2px rgba(var(--color-boxShadow-rgb), .2)',
    aspectRatio: '1 / 1',
  }
})
