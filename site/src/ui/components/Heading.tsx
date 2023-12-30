
type Props = {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
}
export function Heading({ children, className, style }: Props) {
    return <h2 className={className} style={{ paddingBottom: '48px', fontWeight: '800', ...style }}>{children}</h2>
}