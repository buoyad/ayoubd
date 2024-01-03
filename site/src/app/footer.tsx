'use client'
import { IconBadge, Box } from '../ui/components'
import { styleSheet } from '../ui/util'
import { ColorMode, useTheme } from '../ui/theme-context'

export default function Footer() {
  const { theme } = useTheme()
  return (
    <footer style={styles.footer}>
      <Box row style={styles.container} gap="none">
        <Box row>
          <IconBadge href="https://github.com/buoyad" icon="github" />
          <IconBadge
            href="https://www.threads.net/@dannybuoya"
            icon="threads"
          />
        </Box>
        <ColorMode />
      </Box>
    </footer>
  )
}

const styles = styleSheet({
  footer: {
    borderTop: '1px solid var(--color-dimBorder)',
    width: '100%',
  },
  container: {
    margin: '0 auto',
    width: 'var(--content-width)',
    height: 'var(--footer-height)',
    justifyContent: 'space-between',
  },
})
