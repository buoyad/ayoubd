import { Box, Heading, Subheading, Text } from "@/ui/components"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Work',
}

export default function Page() {
    return <Box className="content">
        <Heading>Work</Heading>
        <Text bold style={{ paddingBottom: '48px' }}>You can view my resume (PDF) <a href="/docs/resume.pdf">here</a></Text>
        <Box gap="xxlarge">
            <WorkEntry id="zoom" dates="May 2020 - October 2021" company="Zoom Video Communications">
                <Text>Bringing end-to-end encryption to Zoom video calls.</Text>
            </WorkEntry>
            <WorkEntry id="keybase" dates="September 2017 - May 2020" company="Keybase">
                <Text>At Keybase I was mainly on the desktop team{' '}
                    working on the cross-platform Keybase app. One{' '}
                    codebase was used to build apps for macOS, Windows, Linux, iOS, and Android.</Text>
            </WorkEntry>
        </Box>
    </Box>
}

type WorkEntryProps = {
    id: string,
    dates: string,
    company: string,
    children?: React.ReactNode,
}
const WorkEntry = (props: WorkEntryProps) => {
    const { id, dates, company, children } = props
    return <Box id={id}>
        <Text>{dates}</Text>
        <Subheading>{company}</Subheading>
        {children}
    </Box>
}