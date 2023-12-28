import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import components from '@/ui/components/mdx'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'

const blogContentDir = path.join(process.cwd(), 'content-blog')
const projectsContentDir = path.join(process.cwd(), 'content-projects')

export type FrontMatter = {
    title: string,
    published: Date,
    summary?: string,
    keywords?: string,
    slug?: string,
}

const compile = async (source: string) => {
    return await compileMDX<FrontMatter>({
        source,
        components,
        options: {
            parseFrontmatter: true,
            mdxOptions: { rehypePlugins: [rehypeMdxCodeProps as any] }
        },
    })
}

const getMDXFiles = (dir: string) => {
    return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

const readMDXFile = async (filePath: string) => {
    const source = fs.readFileSync(filePath, 'utf8')
    const { content, frontmatter } = await compile(source)
    return { content, frontmatter }
}

const getMDXContent = async (dir: string) => {
    return await Promise.all(getMDXFiles(dir).map(async (file) => {
        const filePath = path.join(dir, file)
        const { content, frontmatter } = await readMDXFile(filePath)
        return { content, frontmatter, slug: encodeURIComponent((frontmatter.slug || frontmatter.title).replace(/\s/g, '-')) }
    }))
}

export const getBlogContent = async () => await getMDXContent(blogContentDir)
export const getProjectsContent = async () => await getMDXContent(projectsContentDir)
