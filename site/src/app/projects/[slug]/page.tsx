import { getProjectsContent } from "@/lib/content";

export default async function Page({ params }: { params: { slug: string } }) {
    const post = (await getProjectsContent()).find((post) => post.slug === params.slug)
    if (!post) {
        return <p>not found</p>
    }
    return post.content
}