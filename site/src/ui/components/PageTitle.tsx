import { Box, Heading, Subheading } from "."

type Props = {
    title: string,
    subtitle?: string,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export const PageTitle = ({ title, subtitle, ...props }: Props) => {
    return <Box style={{ paddingBottom: '48px' }} {...props}>
        <Heading style={{ paddingBottom: 0 }}>{title}</Heading>
        {subtitle && <h4 style={{ paddingTop: 0, fontWeight: 'normal' }}>{subtitle}</h4>}
    </Box>
}