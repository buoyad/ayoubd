'use client'
import * as React from 'react'
import Link from "next/link"
import { Box } from "../ui/components"
import { styleSheet } from '@/ui/util'

type ValidHref = React.ComponentProps<typeof Link>['href']

const navItems: { title: string, href: ValidHref }[] = [
    { title: 'Home', href: '/' },
    { title: 'Work', href: '/work' },
    { title: 'Projects', href: '/projects' },
]

const disabled = [
    { title: 'Blog', href: '/blog' }
]

export default function Nav() {

    return <>
        <Box style={styles.spacer} />
        <Box style={styles.outer}>
            <Box style={styles.container}>
                <Box row gap="large">
                    {navItems.map((item) =>
                        <NavItem key={item.title} {...item} />
                    )}
                </Box>
            </Box>
        </Box>
    </>
}

const NavItem = ({ title, href }: { title: string, href: ValidHref }) => {
    return <Link style={styles.navItem} href={href}>{title}</Link>
}

const styles = styleSheet({
    container: {
        width: '100%',
        position: 'sticky',
        top: 0,
        padding: '12px 0',
        margin: '0 auto',
        maxWidth: 'var(--content-width)',
    },
    spacer: { height: '36px' },
    navItem: {
        backgroundColor: 'rgba(var(--color-background-rgb), .9)',
        padding: '0 8px',
    },
    outer: {
        position: 'sticky',
        top: 0,
        backgroundColor: 'transparent',
        backgroundImage: `radial-gradient(
            circle at 50% 50%,
            var(--color-background) 10%,
            rgba(var(--color-background-rgb), .5) 10.5%,
            rgba(var(--color-background-rgb), .5) 24.5%,
            var(--color-background) 25%,
            var(--color-background) 35%,
            rgba(var(--color-background-rgb), .5) 35.5%,
            rgba(var(--color-background-rgb), .5) 49.5%,
            var(--color-background) 50%,
            var(--color-background) 60%,
            rgba(var(--color-background-rgb), .5) 60.5%,
            rgba(var(--color-background-rgb), .5) 74.5%,
            var(--color-background) 75%,
            var(--color-background) 85%,
            rgba(var(--color-background-rgb), .5) 85.5%,
            rgba(var(--color-background-rgb), .5) 99.5%,
            var(--color-background) 100%
        )`,

        backgroundSize: '15px 15px',
        backdropFilter: 'blur(5px) hue-rotate(-50deg) saturate(130%)',
        WebkitBackdropFilter: 'blur(5px) hue-rotate(-50deg) saturate(130%)',
    }
})