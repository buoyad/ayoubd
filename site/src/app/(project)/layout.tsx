import type { Metadata } from 'next'
import '../globals.css'
import '../syntax.css'
import { dmSans } from '@/ui/fonts'

import { SetInitialColors } from '../../ui/dark-mode'
import { ColorMode, ThemeProvider } from '../../ui/theme-context'
import { Box } from '../../ui/components'
import Nav from '../nav'
import Footer from '../footer'
import { styleSheet } from '@/ui/util'
import { Analytics } from '../metadata'

export { metadata } from '../metadata'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SetInitialColors />
        <Analytics />
      </head>
      <body>
        <ThemeProvider>
          <Nav />
          <main style={styles.main}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

const styles = styleSheet({
  main: {
    display: 'grid',
    maxWidth: 'unset',
    gridTemplateColumns: '1fr var(--content-width) 1fr',
  },
})
