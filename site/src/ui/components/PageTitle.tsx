import { Box, Heading, Subheading } from '.'

type Props = {
  title: string
  subtitle?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
export const PageTitle = ({ title, subtitle, ref, ...props }: Props) => {
  return (
    <Box style={{ paddingBottom: '48px' }} ref={ref as any} {...props}>
      <Heading style={{ paddingBottom: 0 }}>{title}</Heading>
      {subtitle && (
        <h4 style={{ paddingTop: 0, fontWeight: 'normal' }}>{subtitle}</h4>
      )}
    </Box>
  )
}
