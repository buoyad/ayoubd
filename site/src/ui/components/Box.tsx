import styles from './Box.module.css'

type BoxProps = {
    children?: React.ReactNode,
    gap?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'none',
    style?: React.CSSProperties,
    row?: boolean,
    className?: string,
    id?: string,
}
export function Box({ children, gap = 'small', style, row = false, className: _className, id }: BoxProps) {
    const className = `${styles.box} ${styles[`gap-${gap}`]} ${row ? styles.boxRow : ''} ${_className ?? ''}`
    return <div
        className={className}
        id={id}
        style={style}>
        {children}
    </div>
}