import type { Metadata } from 'next'
import '../globals.css'
import { dmSans } from '@/ui/fonts'
import { SetInitialColors } from '../../ui/dark-mode'
import { ThemeProvider } from '../../ui/theme-context'
import { Box } from '../../ui/components'
import Nav from '../nav'
import Footer from '../footer'

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
      <body className={dmSans.className}>
        <ThemeProvider>
          <Nav />
          <main>
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
