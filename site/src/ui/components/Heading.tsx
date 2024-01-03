type Props = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
export function Heading({ children, className, style }: Props) {
  return (
    <h1
      className={className}
      style={{ paddingBottom: '48px', fontWeight: '800', ...style }}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, style }: Props) {
  return (
    <h2 className={className} style={{ fontWeight: '800', ...style }}>
      {children}
    </h2>
  )
}
