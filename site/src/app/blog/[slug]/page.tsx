import { getBlogContent } from "@/lib/content";
import { Box } from "@/ui/components";

export default async function Page({ params }: { params: { slug: string } }) {
    const post = (await getBlogContent()).find((post) => post.slug === params.slug)
    if (!post) {
        return <p>not found</p>
    }
    return <Box gap="large" className="blog-content" style={{ width: '100%' }}>{post.content}</Box>
}