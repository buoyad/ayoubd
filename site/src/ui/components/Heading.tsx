
type Props = {
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
}
export function Heading({ children, className, style }: Props) {
    return <h1 className={className} style={style}>{children}</h1>
}