import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin' // Hide admin from Google search
    },
    sitemap: 'https://sum4sum5.com/sitemap.xml',
  };
}
