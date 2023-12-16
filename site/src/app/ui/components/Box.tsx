import styles from './Box.module.css'

type BoxProps = {
    children?: React.ReactNode,
    gap?: 'small' | 'medium' | 'large' | 'none',
    style?: React.CSSProperties,
    row?: boolean,
    className?: string,
}
export function Box({ children, gap = 'small', style, row = false, className: _className }: BoxProps) {
    const className = `${styles.box} ${styles[`gap-${gap}`]} ${row ? styles.boxRow : ''} ${_className ?? ''}`
    return <div
        className={className}
        style={style}>
        {children}
    </div>
}