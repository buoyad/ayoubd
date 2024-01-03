import * as React from 'react'
import { IconName, Icon } from './Icon-component'
import { styleSheet } from '../util'
import { Box, Text } from '.'
import Link from 'next/link'

type Props = {
  icon: IconName
  text: string
  href: React.ComponentProps<typeof Link>['href']
}
export const BadgeLink = (props: Props) => {
  const external = props.href.toString().includes('http')
  return (
    <Link
      className="inline-block rounded border border-gray-200 bg-gray-100 p-0.5 font-medium leading-5 dark:border-gray-700 dark:bg-gray-800"
      href={props.href}
      target={external ? '_blank' : '_self'}
    >
      <Icon
        name={props.icon}
        className="relative top-[-1px] mr-1 inline max-h-[.9em] max-w-[.9em]"
      />
      {props.text}
    </Link>
  )
}

type IconBadgeProps = {
  icon: IconName
  children?: React.ReactNode
  href?: string
}

export const IconBadge = (props: IconBadgeProps) => {
  const Container = !!props.href ? 'a' : 'div'
  const containerProps = !!props.href ? { href: props.href } : {}

  return (
    <Container
      {...containerProps}
      className={`flex flex-row items-center rounded border border-gray-300 px-2 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 active:border-gray-400 active:bg-gray-300 dark:border-gray-700 dark:text-gray-400
    dark:hover:bg-gray-800 dark:active:border-gray-600 active:dark:bg-gray-700`}
    >
      <Icon
        name={props.icon}
        width={20}
        height={20}
        className="stroke-gray-600 dark:stroke-gray-400"
      />
      {props.children}
    </Container>
  )
}
