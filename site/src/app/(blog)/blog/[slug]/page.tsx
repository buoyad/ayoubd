import { getBlogContent } from "@/lib/content";
import { Box } from "@/ui/components";

export const dynamic = 'error'
export const dynamicParams = false
export async function generateStaticParams() {
    const content = await getBlogContent()
    return content.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: { slug: string } }) {
    const post = (await getBlogContent()).find((post) => post.slug === params.slug)
    if (!post) {
        return <p>not found</p>
    }
    return post.content
}