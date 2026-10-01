import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Portfolio & Sanity Studio',
    short_name: 'Studio App',
    description: 'Mobile-friendly administrative backend dashboard and portfolio management application.',
    start_url: '/studio',
    display: 'standalone',
    background_color: '#101112',
    theme_color: '#f03e2f',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
