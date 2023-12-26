'use client'
import { Box } from "./ui/components";
import { styleSheet } from "./ui/util";
import { useTheme } from "./ui/theme-context";

export default function Footer() {
    const { theme } = useTheme()
    return (
        <footer style={styles.footer}>
            <Box row style={styles.container}>
                <p>hey</p>
            </Box>
            <div style={{ ...styles.bottomBorder, opacity: .2 }} />
            <div style={{ ...styles.bottomBorder, opacity: .4 }} />
            <div style={{ ...styles.bottomBorder, opacity: .6 }} />
            <div style={{ ...styles.bottomBorder, opacity: .8 }} />
            <div style={{ ...styles.bottomBorder, opacity: 1 }} />
        </footer>
    )
}

const styles = styleSheet({
    bottomBorder: {
        width: '100%',
        height: 20,
        backgroundColor: 'var(--color-text)',
    },
    footer: {
        boxShadow: '0 50vh 0 50vh var(--color-text)',
        paddingTop: '50vh',
        transition: 'box-shadow 350ms'
    },
    container: {
        position: 'relative',
        width: '100%',
        height: 'var(--footer-height)',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})