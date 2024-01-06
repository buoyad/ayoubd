import React from 'react'
import { Icon, IconName } from './Icon-component'
import { Box } from '.'
import { styleSheet } from '../util'

type Props = {
  icon: IconName | React.ReactNode
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}
export const Callout = (props: Props) => {
  let icon =
    typeof props.icon === 'string' ? (
      <Icon name={props.icon as IconName} />
    ) : (
      props.icon
    )
  return (
    <Box
      row
      gap="none"
      style={props.style}
      className={
        'items-start divide-x divide-[--color-dimBorder] rounded-lg border border-[--color-dimBorder] bg-[--color-dimHighlight]' +
        ' ' +
        props.className
      }
    >
      <Box className="h-full shrink-0 p-3">{icon}</Box>
      <Box className="px-3 py-1.5">{props.children}</Box>
    </Box>
  )
}
