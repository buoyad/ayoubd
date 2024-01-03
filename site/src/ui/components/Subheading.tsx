type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
export function Subheading({ children, className, style }: Props) {
  return (
    <h3 className={className} style={style}>
      {children}
    </h3>
  )
}
