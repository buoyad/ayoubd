import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Heading, Code } from '.'

const components: MDXRemoteProps['components'] = {
    h1: (props) => <Heading style={{ color: 'tomato' }} {...props} />,
    pre: (props) => <Code {...props} />,
}

export default components