import { getBlogContent } from "@/lib/content"
import { Box } from "@/ui/components"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    _parent: ResolvingMetadata
): Promise<Metadata> {
    const { title, description } = await _parent
    const post = (await getBlogContent()).find((post) => post.slug === params.slug)

    return {
        title: post?.frontmatter.title ?? title,
        description: post?.frontmatter.summary ?? description,
    }
}

export const dynamic = 'error'
export const dynamicParams = false
export async function generateStaticParams() {
    const content = await getBlogContent()
    return content.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: Props) {
    const post = (await getBlogContent()).find((post) => post.slug === params.slug)
    if (!post) {
        return <p>not found</p>
    }
    return post.content
}