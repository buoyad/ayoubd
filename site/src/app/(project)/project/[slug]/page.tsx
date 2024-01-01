import React from "react"
import { getProjectsContent } from "@/lib/content"
import { Box } from "@/ui/components"
import Image from "next/image"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    _parent: ResolvingMetadata
): Promise<Metadata> {
    const { title, description } = await _parent
    const post = (await getProjectsContent()).find((post) => post.slug === params.slug)

    return {
        title: post?.frontmatter.title ?? title,
        description: post?.frontmatter.summary ?? description,
    }
}

export const dynamic = 'error'
export const dynamicParams = false
export async function generateStaticParams() {
    const content = await getProjectsContent()
    return content.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: Props) {
    const post = (await getProjectsContent()).find((post) => post.slug === params.slug)
    if (!post) {
        return <p>not found</p>
    }
    return <>
        {post.frontmatter.heroImage && <HeroImage alt={post.frontmatter.heroImageAlt} src={post.frontmatter.heroImage} mode={post.frontmatter.heroImageMode} />}
        <Box className="content project-content" gap="large">
            {post.content}
        </Box>
    </>
}

type HeroProps = {
    src: string,
    alt?: string,
    mode?: 'contain' | 'cover',
    style?: React.CSSProperties,
}
const HeroImage = (props: HeroProps) => {
    const { src, alt = 'a large image representing this project', mode = 'contain', style } = props
    const sizeMatch = src.match(/([0-9]*)x([0-9]*)/)
    let imgComponent
    if (sizeMatch) {
        const width = parseInt(sizeMatch[1])
        const height = parseInt(sizeMatch[2])
        imgComponent = <Image alt={alt} src={src} width={width} height={height} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: mode }} />
    } else {
        imgComponent = <img src={src} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: mode }} />
    }
    return <div style={{ width: '100%', height: 200, ...style }}>
        {imgComponent}
    </div>
}