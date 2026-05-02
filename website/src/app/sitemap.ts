import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sum4sum5.com';

  const routes = [
    '',
    '/wheel',
    '/random-number',
    '/random-name',
    '/random-caption',
    '/blog',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('random') || route === '/wheel' ? 0.8 : 0.5,
  }));
}
