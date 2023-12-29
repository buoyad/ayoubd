import * as React from 'react'
import Link from "next/link";
import { Box } from "../ui/components";
import { styleSheet } from '@/ui/util';

export default function Nav() {

    return <>
        <Box style={styles.spacer} />
        <Box style={styles.container}>
            <Box row gap="large">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/work">Work</Link>
            </Box>
        </Box>
        <div style={styles.line} />
    </>
}

const styles = styleSheet({
    container: {
        width: '100%',
        position: 'sticky',
        top: 0,
        padding: '12px',
        margin: '0 auto',
        maxWidth: 'var(--content-width)',
        backgroundColor: 'var(--color-background)'
    },
    spacer: { height: '36px' },
    line: {
        width: '100%',
        position: 'sticky',
        top: 'calc(1lh + 24px)',
        height: 1,
        background: 'linear-gradient(90deg, rgba(var(--color-text-rgb), .2) 0%, rgba(var(--color-text-rgb), .3) 50%, rgba(var(--color-text-rgb), .2) 100%)'
    }
})