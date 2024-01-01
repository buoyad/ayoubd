import * as React from 'react'

// this file is named icon-component because next.js reserves icon.tsx

export type IconName = 'warning' | 'color_zoom' | 'color_keybase'

type Props = {
    name: IconName,
    width?: number,
    height?: number,
    stroke?: string,
    fill?: string,
    strokeWidth?: number,
    className?: string,
    style?: React.CSSProperties
}
export const Icon = (props: Props) => {
    const {
        name,
        width = 32,
        height = 32,
        stroke = 'var(--color-text)',
        strokeWidth = 1,
        fill = 'none',
        style,
        className,
    } = props

    if (name.startsWith('color')) {
        return <img
            src={`/sprites/${name}.svg`}
            width={width}
            height={height}
            className={className}
            style={style}
            role="img" />
    }

    return <svg
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={className}
        color={fill}
        style={style}
        role="img">
        <use href={`/sprite.svg#${name}`} />
    </svg>
}