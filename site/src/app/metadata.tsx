import { Metadata } from 'next'
import type { Person, WithContext } from 'schema-dts'

// See favicon guide here:
// https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
// Icons generated with:
// https://realfavicongenerator.net/

export const metadata: Metadata = {
  metadataBase: new URL('https://ayoubd.com/'),
  title: {
    template: '%s | Danny Ayoub',
    default: 'Danny Ayoub',
  },
  description: 'Software engineer. Internet person.',
  icons: [
    { rel: 'apple-touch-icon', url: '/images/icons/apple-touch-icon.png?v=2' },
    { sizes: '48x48', url: '/images/icons/favicon.ico?v=2' },
    {
      sizes: 'any',
      type: 'image/svg+xml',
      url: '/images/icons/favicon.svg?v=2',
    },
    {
      rel: 'manifest',
      url: '/images/icons/site.webmanifest?v=2',
    },
    {
      rel: 'shortcut icon',
      url: '/images/icons/favicon.ico?v=2',
    },
  ],
  openGraph: {
    title: 'Danny Ayoub',
    description: 'Software engineer. Internet person.',
    url: 'https://ayoubd.com/',
    siteName: 'Danny Ayoub',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: `A rectangular image with a circular image contained inside it of Danny Ayoub smiling at the camera. To the right of the circular image are the words 'Danny Ayoub'. The background is a dark grey with yellow and red wavy gradients covering the bottom third.`,
      },
    ],
  },
  keywords: [
    'software engineer',
    'product engineer',
    'frontend engineer',
    'frontend developer',
    'fullstack engineer',
    'fullstack developer',
    'full stack engineer',
    'full stack developer',
    'software developer',
    'security engineer',
    'react developer',
  ],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  creator: 'Danny Ayoub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const meStructuredData: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Danny Ayoub',
  image: 'https://ayoubd.com/images/me.jpeg',
  description: metadata.description!,
  jobTitle: 'Software Engineer',
}

export const InsertStructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(meStructuredData) }}
  />
)

export const Analytics = () => (
  <script
    data-goatcounter="https://ayoubd.goatcounter.com/count"
    async
    src="//gc.zgo.at/count.js"
  ></script>
)
