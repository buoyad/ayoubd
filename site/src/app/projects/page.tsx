import { getProjectsContent } from '@/lib/content'
import { Box, Heading, Subheading } from '../../ui/components'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export default async function Page() {
  const content = await getProjectsContent()
  return (
    <Box className="content">
      <Heading>Projects</Heading>
      {content.map((post) => (
        <ProjectRow key={post.slug} {...post} />
      ))}
    </Box>
  )
}

const ProjectRow = ({
  frontmatter,
  slug,
}: ArrayElement<Awaited<ReturnType<typeof getProjectsContent>>>) => {
  return (
    <Box gap="none">
      <Link href={`/projects/${slug}`}>
        <Subheading>{frontmatter.title}</Subheading>
      </Link>
      {!!frontmatter.summary && <p>{frontmatter.summary}</p>}
    </Box>
  )
}
