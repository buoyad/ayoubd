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
      style={{ ...styles.container, ...props.style }}
      className={props.className}
    >
      <Box style={styles.leftCol}>{icon}</Box>
      <Box style={styles.rightCol}>{props.children}</Box>
    </Box>
  )
}

const styles = styleSheet({
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'var(--color-dimHighlight)',
    borderRadius: '8px',
    border: '1px solid var(--color-dimBorder)',
  },
  leftCol: {
    padding: '12px',
    height: '100%',
    borderRight: '1px solid var(--color-dimBorder)',
    flexShrink: 0,
  },
  rightCol: {
    padding: '6px 12px',
    boxShadow: '-1px 0px var(--color-dimBorder)',
  },
})
