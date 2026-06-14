export const revalidate = 86400 // Revalidate every 24 hours
import { MetadataRoute } from 'next'

// Total number of recipes — update when you add new recipes
const MAX_RECIPE_ID = 7000;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://easycook.in'

  // 1. Static Pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/submit',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Recipe Pages — Generated from static ID range (ZERO DB reads)
  const recipePages = Array.from({ length: MAX_RECIPE_ID }, (_, i) => ({
    url: `${baseUrl}/recipe/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...recipePages]
}