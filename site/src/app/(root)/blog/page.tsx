import { getBlogContent } from '@/lib/content'
import { Box, Heading, Subheading } from '../../../ui/components'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export default async function Page() {
  const content = await getBlogContent()
  return (
    <Box className="content">
      <Heading>Blog</Heading>
      {content.map((post) => (
        <PostRow key={post.slug} {...post} />
      ))}
    </Box>
  )
}

const PostRow = ({
  content,
  frontmatter,
  slug,
}: ArrayElement<Awaited<ReturnType<typeof getBlogContent>>>) => {
  return (
    <Box gap="none">
      <Subheading>
        <Link href={`/blog/${slug}`}>{frontmatter.title}</Link>
      </Subheading>
      {!!frontmatter.summary && <p>{frontmatter.summary}</p>}
    </Box>
  )
}
