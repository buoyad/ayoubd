'use client'
import * as React from 'react'
import Link from 'next/link'
import { Box } from '../ui/components'
import { styleSheet } from '@/ui/util'
import { usePathname } from 'next/navigation'

type ValidHref = string

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Work', href: '/work' },
  { title: 'Writing', href: '/blog' },
  { title: 'Projects', href: '/projects' },
] as const

const disabled = []

export default function Nav() {
  return (
    <>
      <style>
        {`
        @keyframes rotateHue {
          from {
            filter: hue-rotate(0deg) blur(10px);
            background-position: 0 0;
          }
          to {
            filter: hue-rotate(360deg) blur(10px);
            background-position: 700px 0;
          }
        }

        .nav-background-1 {
          animation: rotateHue 60s linear infinite;
        }

        .nav-background-2 {
          animation: rotateHue 30s linear -9s reverse infinite;
        }
      `}
      </style>
      <Box
        style={styles.backgroundImage}
        className="nav-background-1 absolute left-0 right-0 top-0 h-[calc(2*var(--header-height))]"
      />
      <Box
        style={styles.backgroundImage2}
        className="nav-background-2 absolute left-0 right-0 top-0 h-[calc(2*var(--header-height))]"
      />
      <Box className="mx-auto my-0 h-[--header-height] max-w-[--content-width] py-3 mix-blend-luminosity">
        <Box row gap="small">
          {navItems.map((item) => (
            <NavItem key={item.title} {...item} />
          ))}
        </Box>
      </Box>
    </>
  )
}

const NavItem = ({
  title,
  href,
}: {
  title: string
  href: (typeof navItems)[number]['href']
}) => {
  const pathname = usePathname()
  const isCurrent = pathname.includes(href) || (href === '/' && pathname === '')
  const color = isCurrent
    ? ' text-gray-900 dark:text-gray-100'
    : ' text-gray-700 dark:text-gray-300'
  return (
    <Link
      className={'px-2 font-bold  mix-blend-luminosity' + color}
      href={href}
    >
      {title}
    </Link>
  )
}

const styles = styleSheet({
  backgroundImage: {
    backgroundImage: 'url(/sprites/header.svg)',
    backgroundRepeat: 'repeat-x',
  },
  backgroundImage2: {
    backgroundImage: 'url(/sprites/header2.svg)',
    backgroundRepeat: 'repeat-x',
  },
})
