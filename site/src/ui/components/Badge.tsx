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
