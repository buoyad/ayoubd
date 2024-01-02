import React from "react"
import { getProjectsContent } from "@/lib/content"
import { Box } from "@/ui/components"
import Image from "next/image"
import { Metadata, ResolvingMetadata } from "next"
import { styleSheet } from "@/ui/util"

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
    return <Box className="content" style={styles.outer}>
        <Box row gap="large" style={styles.inner}>
            {post.frontmatter.heroImage && <HeroImage alt={post.frontmatter.heroImageAlt} src={post.frontmatter.heroImage} mode={post.frontmatter.heroImageMode} style={styles.heroImage} />}
            <Box className="project-content" gap="large" style={styles.content}>
                {post.content}
            </Box>
        </Box>
    </Box>
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
        imgComponent = <Image alt={alt} src={src} width={width} height={height} style={{ maxWidth: '200px', maxHeight: '200px', objectFit: mode, ...style }} />
    } else {
        imgComponent = <img src={src} style={{ maxWidth: '200px', maxHeight: '200px', objectFit: mode, ...style }} />
    }
    return imgComponent
}

const styles = styleSheet({
    outer: {
        display: 'grid',
        gridColumn: '1 / -1',
        padding: '4rem 0 0',
        columnGap: 'var(--content-padding-horizontal)',
        gridTemplateColumns: '1fr min(calc(100vw - 2*var(--content-padding-horizontal)), 110ch) 1fr',
    },
    inner: {
        gridColumn: 2,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    heroImage: {
        flexShrink: 1,
    },
    content: {
        flexBasis: '50ch',
    }
})