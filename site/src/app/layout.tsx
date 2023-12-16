import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { SetInitialColors } from './ui/dark-mode'
import { ThemeProvider } from './ui/theme-context'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
