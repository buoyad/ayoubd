import fs from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import components from '@/ui/components/mdx'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypeHighlight from 'rehype-highlight'
import { unstable_cache } from 'next/cache'

const blogContentDir = path.join(process.cwd(), 'content-blog')
const projectsContentDir = path.join(process.cwd(), 'content-projects')

// this cache is only ever invalidated on deploys to production
// TTFB before this change: 200-300ms
// TTFB after this change: 50-100ms
const cache =
  process.env.NODE_ENV === 'production'
    ? unstable_cache
    : <T extends Function>(fn: T) => fn

export type FrontMatter = {
  title: string
  published: Date
  summary?: string
  keywords?: string
  slug?: string
  heroImage?: string
  heroImageAlt?: string
  heroImageMode?: 'contain' | 'cover'
}

const compile = async (source: string) => {
  return await compileMDX<FrontMatter>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeHighlight, rehypeMdxCodeProps as any],
      },
    },
  })
}

const getMDXFiles = cache(async (dir: string) => {
  return (await fs.readdir(dir)).filter((file) => path.extname(file) === '.mdx')
})

const readMDXFile = cache(
  async (filePath: string) => await fs.readFile(filePath, 'utf8'),
)

const compileMDXFile = async (filePath: string) => {
  const source = await readMDXFile(filePath)
  const { content, frontmatter } = await compile(source)
  return { content, frontmatter }
}

const getMDXContent = async (dir: string) => {
  const content = await Promise.all(
    (await getMDXFiles(dir)).map(async (file) => {
      const filePath = path.join(dir, file)
      const { content, frontmatter } = await compileMDXFile(filePath)
      frontmatter.slug = encodeURIComponent(
        (frontmatter.slug || frontmatter.title).replace(/\s/g, '-'),
      )
      return { content, frontmatter, slug: frontmatter.slug }
    }),
  )
  content.sort((a, b) =>
    a.frontmatter.published > b.frontmatter.published ? -1 : 1,
  )
  return content
}

export const getBlogContent = async () => await getMDXContent(blogContentDir)
export const getProjectsContent = async () =>
  await getMDXContent(projectsContentDir)
