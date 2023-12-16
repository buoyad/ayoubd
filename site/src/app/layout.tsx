import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

import { SetInitialColors } from './ui/dark-mode'
import { ThemeProvider } from './ui/theme-context'

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
