import { getBlogContent } from "@/lib/content";

export default async function Page({ params }: { params: { slug: string } }) {
    const post = (await getBlogContent()).find((post) => post.slug === params.slug)
    if (!post) {
        return <p>not found</p>
    }
    return post.content
}