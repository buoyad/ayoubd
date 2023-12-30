import React from "react";
import { getProjectsContent } from "@/lib/content";
import { Box } from "@/ui/components";

export const dynamic = 'error'
export const dynamicParams = false
export async function generateStaticParams() {
    const content = await getProjectsContent()
    return content.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: { slug: string } }) {
    const post = (await getProjectsContent()).find((post) => post.slug === params.slug)
    if (!post) {
        return <p>not found</p>
    }
    return <Box gap="large" className="project-content" style={{ width: '100%' }}>
        {post.frontmatter.heroImage && <HeroImage src={post.frontmatter.heroImage} mode={post.frontmatter.heroImageMode} />}
        {post.content}
    </Box>
}

type Props = {
    src: string,
    mode?: 'contain' | 'cover',
    style?: React.CSSProperties,
}
const HeroImage = (props: Props) => {
    const { src, mode = 'contain', style } = props
    return <div style={{ width: '100%', height: 200, ...style }}>
        <img src={src} style={{ width: '100%', height: '100%', objectFit: mode }} />
    </div>
}