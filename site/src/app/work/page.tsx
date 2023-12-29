import { Box, Heading, Subheading, Text } from "@/ui/components";

export default function Page() {
    return <Box>
        <Heading>Work</Heading>
        <Box gap="xxlarge">
            <WorkEntry id="zoom">
                <Text>May 2020 - October 2021</Text>
                <Subheading>Zoom</Subheading>
                <Text>At Zoom I was on the Security Engineering and Security Devops teams.</Text>
            </WorkEntry>
            <WorkEntry id="keybase">
                <Text>September 2017 - May 2020</Text>
                <Subheading>Keybase</Subheading>
                <Text>At Keybase I was mainly on the desktop team{' '}
                    working on the cross-platform Keybase app. One{' '}
                    codebase was used to build apps for macOS, Windows, Linux, iOS, and Android.</Text>
            </WorkEntry>
        </Box>
    </Box>
}

const WorkEntry = ({ id, children }: { id: string, children: React.ReactNode }) => {
    return <Box id={id}>
        {children}
    </Box>
}