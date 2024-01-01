import * as React from 'react'

// this file is named icon-component because next.js reserves icon.tsx

type IconName = 'warning'

type Props = {
    name: IconName,
    width?: number,
    height?: number,
    stroke?: string,
    fill?: string,
    strokeWidth?: number,
    className?: string,
}
export const Icon = (props: Props) => {
    const {
        name,
        width = 32,
        height = 32,
        stroke = 'var(--color-text)',
        strokeWidth = 1,
        fill = 'none',
        className,
    } = props
    return <svg
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={className}
        color={fill}
        role="img">
        <use href={`/sprite.svg#${name}`} />
    </svg>
}