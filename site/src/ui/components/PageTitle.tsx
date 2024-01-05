import dayjs from 'dayjs'
import { Box, Heading, Text } from '.'

type Props = {
  title: string
  subtitle?: string
  published?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
export const PageTitle = ({
  title,
  subtitle,
  ref,
  published,
  ...props
}: Props) => {
  const pub = !!published && dayjs(published)
  return (
    <Box className="w-full pb-12" ref={ref as any} {...props}>
      <Box row className="w-full items-end justify-between overflow-hidden">
        <Heading style={{ paddingBottom: 0 }}>{title}</Heading>
        {pub && (
          <>
            <Text className="hidden shrink-0 text-nowrap text-sm sm:inline">
              {pub.format('MMMM D, YYYY')}
            </Text>
            <Text className="shrink-0 text-nowrap text-sm sm:hidden">
              {pub.format('MM/DD/YYYY')}
            </Text>
          </>
        )}
      </Box>
      {subtitle && (
        <h4 style={{ paddingTop: 0, fontWeight: 'normal' }}>{subtitle}</h4>
      )}
    </Box>
  )
}
