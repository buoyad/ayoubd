import * as React from 'react'
import Link from 'next/link'
import { BadgeLink, Box, Heading, Icon, Text } from '../ui/components'
import Diorama from './diorama-loader'
import { styleSheet } from '@/ui/util'
import meJPG from '@/../public/images/me_sq.jpeg'
import Image from 'next/image'
import { Callout } from '@/ui/components/Callout'

export default function Home() {
  return (
    <Box className="content">
      <Box gap="large" style={{ alignItems: 'center' }}>
        <Callout
          icon={<Icon name="warning" strokeWidth={0} className="text-yellow" />}
          style={styles.warningText}
        >
          <Text>
            I am in the process of migrating content from my{' '}
            <Link href="https://old.ayoubd.com">old website</Link>.<br />
            Please excuse the mess.
          </Text>
        </Callout>
        <Heading className="self-start">Hi, I'm Danny</Heading>
        <Image
          src={meJPG}
          style={styles.profilePic}
          className="w-10/12 sm:w-2/6"
          priority={true}
          width={600}
          height={600}
          alt={`An image of Danny Ayoub, a man with short black hair and glasses, smiling at the camera sitting at a brown wooden table. His elbows are resting on the table and his arms are crossed. A few tall landscaping trees stand in the background.`}
        />
        <Box>
          <Text>I'm a software engineer and amateur potter based in NYC.</Text>
          <Text>
            I specialize in product and front-end development for high security
            applications. I create usable, secure-by-default software that
            respects user privacy and is delightful to use.
          </Text>
          <Text>
            I've previously worked at{' '}
            <BadgeLink href="/work#zoom" icon="color_zoom" text="Zoom" /> and{' '}
            <BadgeLink
              icon="color_keybase"
              href="/work#keybase"
              text="Keybase"
            />
            . You can ask{' '}
            <BadgeLink href="/work#chat" icon="openai" text="GPT-4" /> about my
            professional experience.
          </Text>
          <Text>
            I currently work on personal projects and experiments under the
            company I started,{' '}
            <Link href="https://scratchingpost.net" target="_blank">
              Scratching Post
            </Link>
            .
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
    gridTemplateColumns:
      '1fr min(calc(100vw - 2*var(--content-padding-horizontal)), 80ch) 1fr',
  },
  warningText: {
    gridColumn: '1/ -1',
    placeSelf: 'center',
  },
  innerGrid: {
    display: 'grid',
    gridColumn: 2,
    columnGap: '16px',
    rowGap: '64px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  profilePic: {
    objectFit: 'cover',
    borderRadius: '4px',
    boxShadow: '2px 2px 2px rgba(var(--color-boxShadow-rgb), .2)',
    aspectRatio: '1 / 1',
  },
})
