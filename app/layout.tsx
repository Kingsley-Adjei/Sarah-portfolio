import type { Metadata } from 'next'
import Script from 'next/script'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'Sarah Adjei — Filmmaker & Visual Director',
  description: 'Official portfolio of Sarah Adjei (Abyna Koblyn), filmmaker, screenwriter, producer, and director based in Accra, Ghana.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-[#080808]">
      <head>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-[#080808] text-white min-h-screen font-sans antialiased selection:bg-white selection:text-black">
        <div className="film-grain-overlay pointer-events-none" />
        {children}
      </body>
    </html>
  )
}
