import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://blog.ram.codes',
      images: '/banner.png',
      siteName: 'Blog - ram.codes',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@blank_riser',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/banner.png',
      ...override.twitter,
    },
    alternates: {
      types: {
        'application/rss+xml': [
          {
            title: 'Blog - ram.codes',
            url: 'https://blog.ram.codes/rss.xml',
          },
        ],
      },
      ...override.alternates,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' ||
  !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
