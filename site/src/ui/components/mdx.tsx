import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Heading, Code, CodeInner, PageTitle } from '.'
import Link from 'next/link'
import Image from 'next/image'

const components: MDXRemoteProps['components'] = {
    h1: (props) => <Heading {...props} />,
    pre: (props) => <Code {...props} />,
    code: (props) => <CodeInner {...props} />,
    // @ts-ignore
    a: ({ ref, href, ...props }) => <Link href={href!} target={href!.includes('http') ? '_blank' : '_self'} {...props} />,
    ol: (props) => <ol style={{ padding: '0 32px' }} {...props} />,
    PageTitle: (props) => <PageTitle {...props} />,
    Image: ({ style, ...props }) => <Image style={{ maxWidth: '100%', ...style }} {...props} />,
}

export default components