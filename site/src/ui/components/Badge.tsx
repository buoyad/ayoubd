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
      style={styles.container}
      href={props.href}
      target={external ? '_blank' : '_self'}
    >
      <Icon name={props.icon} style={styles.icon} />
      {props.text}
    </Link>
  )
}

const styles = styleSheet({
  container: {
    backgroundColor: 'var(--color-dimHighlight)',
    padding: '2px',
    border: '1px solid var(--color-dimBorder)',
    borderRadius: '4px',
    color: 'var(--color-text)',
    whiteSpace: 'nowrap',
  },
  icon: {
    position: 'relative',
    maxHeight: '.9em',
    maxWidth: '.9em',
    marginRight: '4px',
    top: '2px',
  },
})
