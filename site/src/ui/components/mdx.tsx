import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Heading, Code, PageTitle } from '.'
import Link from 'next/link'

const components: MDXRemoteProps['components'] = {
    h1: (props) => <Heading {...props} />,
    pre: (props) => <Code {...props} />,
    a: (props) => <a {...props} target={props.href?.includes('http') ? '_blank' : undefined} />,
    ol: (props) => <ol style={{ padding: '0 32px' }} {...props} />,
    PageTitle: (props) => <PageTitle {...props} />,
}

export default components