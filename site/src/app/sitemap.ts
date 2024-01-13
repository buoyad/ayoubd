import { getBlogContent, getProjectsContent } from '@/lib/mdx-content'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = (await getBlogContent()).map((post) => ({
    url: `https://ayoubd.com/blog/${post.slug}`,
    lastModified: post.frontmatter.published.toISOString().split('T')[0],
  }))
  const projectPosts = (await getProjectsContent()).map((post) => ({
    url: `https://ayoubd.com/projects/${post.slug}`,
    lastModified: post.frontmatter.published.toISOString().split('T')[0],
  }))

  const routes = ['/', '/blog', '/projects', '/work'].map((route) => ({
    url: `https://ayoubd.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))
  return [...routes, ...blogPosts, ...projectPosts]
}
