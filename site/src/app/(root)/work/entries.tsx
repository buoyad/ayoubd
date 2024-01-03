import { Icon, Box, Text, Heading, Subheading, H2 } from '@/ui/components'
import Link from 'next/link'

type WorkEntryProps = {
    id: string,
    dates: string,
    company: string,
    title: string,
    icon?: React.ComponentProps<typeof Icon>['name'],
    children?: React.ReactNode,
}
const WorkEntry = (props: WorkEntryProps) => {
    const { id, dates, company, title, children } = props
    return <Box id={id} style={{ marginTop: 'calc(-1 * var(--header-height))', paddingTop: 'var(--header-height)' }}>
        <Box row style={{ width: '100%', }}>
            <Box style={{ marginRight: 'auto' }}>
                <Text bold>{dates}</Text>
                <H2 style={{ padding: 0 }}>{company}</H2>
                <Subheading>{title}</Subheading>
            </Box>
            {props.icon && <Icon name={props.icon} width={64} height={64} />}
        </Box>
        {children}
    </Box>
}

export const ZoomEntry = () => (
    <WorkEntry id="zoom" icon="color_zoom" dates="May 2020 - October 2021" company="Zoom Video Communications" title="Security Engineer">
        <Text>
            Bringing end-to-end encryption to Zoom products.
        </Text>
        <ul>
            <li>
                <Text bold inline>Hardware Security Modules - </Text>
                <Text inline>
                    Architected and deployed the intermediate CA
                    that stores trusted server signing keys in
                    hardware security modules (HSMs), enabling
                    potential clients with high security compliance
                    requirements to consider Zoom products.
                    Implemented an ACME client that interfaces with DigiCert CA
                    and automatically rotates certificates.
                </Text>
                <Text>As described in section 7.6.1 of the <Link href="https://github.com/zoom/zoom-e2e-whitepaper">cryptography whitepaper</Link>.</Text>
            </li>
            <li>
                <Text bold inline>Cross-region communication - </Text>
                <Text inline>
                    System that allows keyservers
                    to communicate with each other across regions, allowing
                    customers with data residency requirements to upgrade to
                    end-to-end encrypted products.
                </Text>
            </li>
            <li>
                <Text bold inline>Monitoring - </Text>
                <Text inline>
                    Build Grafana dashboards and prometheus alert configurations
                    to monitor deployments and scheduled jobs and alert on-call engineers
                    when issues arise, increasing S/N ratio of alerts to approach 100%, and
                    enabling near perfect uptime guarantee.
                </Text>
            </li>
        </ul>
    </WorkEntry>
)

export const KeybaseEntry = () => (
    <WorkEntry id="keybase" icon="color_keybase" dates="September 2017 - May 2020" company="Keybase" title="Software Engineer">
        <Text>At Keybase I was mainly on the desktop team
            working on the cross-platform Keybase app. One
            codebase was used to build apps for macOS, Windows, Linux, iOS, and Android.</Text>
        <ul>
            <li>
                <Text bold inline>Teams tab redesign - </Text>
                <Text inline>
                    Led a team of 4 engineers in re-implementing 30+
                    screens using a cohesive design system. Worked closely with
                    design and core teams to create a consistent library of 100+ components,
                    hooks, and API protocols to serve as the foundation for future development.
                </Text>
            </li>
            <li>
                <Text bold inline>Exploding messages - </Text>
                <Text inline>
                    Implemented the cryptographically sound exploding messages UI,
                    which allows users to send messages that disappear after a set time.
                    Integrated animations and timers into an already complex chat UI that
                    continued to grow around it for 2+ years without breaking. Ensured no
                    data was kept in frontend memory after the message expired.
                </Text>
            </li>
            <li>
                <Text bold inline>Cryptocurrency Integration - </Text>
                <Text inline>
                    Took initiative in studying Stellar cryptocurrency protocol ahead of
                    valuable partnership project, enabling faster development and allowing
                    Keybase to be the first full-featured Stellar wallet. Designed and
                    implemented the protocol for sending payments integrating security features
                    such as payment confirmation and nonces to prevent replay attacks and accidental
                    double spends.
                </Text>
            </li>
        </ul>
    </WorkEntry>
)