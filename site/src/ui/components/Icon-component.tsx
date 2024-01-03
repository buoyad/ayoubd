import * as React from 'react'
import { styleSheet } from '../util'

// this file is named icon-component because next.js reserves icon.tsx

export type IconName =
  | 'warning'
  | 'sun'
  | 'moon'
  | 'gear'
  | 'chevron-down'
  | 'github'
  | 'threads'
  | 'color_zoom'
  | 'color_keybase'

type Props = {
  name: IconName
  width?: number
  height?: number
  stroke?: string
  fill?: string
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}
export const Icon = (props: Props) => {
  const {
    name,
    width = 32,
    height = 32,
    stroke,
    strokeWidth = 1,
    fill = 'none',
    style,
    className,
  } = props

  if (name.startsWith('color')) {
    return (
      <img
        src={`/sprites/${name}.svg`}
        width={width}
        height={height}
        className={className}
        style={{ ...styles.icon, ...style }}
        role="img"
      />
    )
  }

  return (
    <svg
      width={width}
      height={height}
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      color={fill}
      style={{ ...styles.icon, ...style }}
      role="img"
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  )
}

const styles = styleSheet({
  icon: {
    flexShrink: 0,
  },
})
