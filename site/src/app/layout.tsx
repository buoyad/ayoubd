import './globals.css'
import { SetInitialColors } from '../ui/dark-mode'
import { ThemeProvider } from '../ui/theme-context'
import Nav from './nav'
import Footer from './footer'
import { Analytics, InsertStructuredData } from './metadata'

export { metadata } from './metadata'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SetInitialColors />
        <InsertStructuredData />
        <Analytics />
      </head>
      <body>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
