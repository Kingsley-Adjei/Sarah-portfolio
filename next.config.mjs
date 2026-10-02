import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  disable: false, // PWA active for both development and production
  register: true,
  skipWaiting: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^\/studio.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'sanity-studio-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60, // 24 Hours
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'sanity-media-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
        },
      },
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Direct delivery from Sanity CDN bypasses Next.js Node server image proxy timeouts
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
}

export default withPWA(nextConfig)
