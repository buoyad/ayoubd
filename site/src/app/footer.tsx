'use client'
import { Box } from "./ui/components";
import { styleSheet } from "./ui/util";
import { useTheme } from "./ui/theme-context";

export default function Footer() {
    const { theme } = useTheme()
    return (
        <footer>
            <Box row style={styles.container}>
                <p>hey</p>
            </Box>
        </footer>
    )
}

const styles = styleSheet({
    container: {
        position: 'relative',
        width: '100%',
        height: 'var(--footer-height)',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})