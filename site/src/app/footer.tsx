'use client'
import { Box } from "../ui/components";
import { styleSheet } from "../ui/util";
import { ColorMode, useTheme } from "../ui/theme-context";

export default function Footer() {
    const { theme } = useTheme()
    return (
        <footer style={styles.footer}>
            <Box style={styles.container} gap="none">
                <p>this is the end</p>
                <ColorMode />
            </Box>
            <div style={{ ...styles.bottomBorder, opacity: .1 }} />
            <div style={{ ...styles.bottomBorder, opacity: .3 }} />
            <div style={{ ...styles.bottomBorder, opacity: .5 }} />
            <div style={{ ...styles.bottomBorder, opacity: .7 }} />
            <div style={{ ...styles.bottomBorder, opacity: .9 }} />
        </footer>
    )
}

const styles = styleSheet({
    bottomBorder: {
        width: '100%',
        height: 10,
        backgroundColor: 'var(--color-text)',
    },
    footer: {
        paddingTop: '30vh',
    },
    container: {
        position: 'relative',
        width: '100%',
        height: 'var(--footer-height)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})