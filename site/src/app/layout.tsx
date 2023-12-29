import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import './syntax.css'

import { SetInitialColors } from '../ui/dark-mode'
import { ColorMode, ThemeProvider } from '../ui/theme-context'
import { Box } from '../ui/components'
import Nav from './nav'
import Footer from './footer'

const bodyFont = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Danny Ayoub',
  description: 'Software engineer. Internet person.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SetInitialColors />
      </head>
      <body className={bodyFont.className}>
        <ThemeProvider>
          <main>
            <Nav />
            <Box className="content" gap="large">
              {children}
            </Box>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
