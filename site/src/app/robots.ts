import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/docs', '/fonts', '/models', '/sprites'],
    },
    sitemap: 'https://ayoubd.com/sitemap.xml',
  }
}
