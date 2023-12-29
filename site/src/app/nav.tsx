import * as React from 'react'
import Link from "next/link";
import { Box } from "../ui/components";
import { styleSheet } from '@/ui/util';

export default function Nav() {

    return <>
        <Box style={styles.spacer} />
        <Box
            row={true}
            gap="large"
            style={styles.container}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/work">Work</Link>
        </Box>
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
    spacer: { height: '36px' }
})