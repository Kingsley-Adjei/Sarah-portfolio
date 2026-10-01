'use client'

/**
 * OPTIONAL CATCH-ALL ROUTE (`[[...index]]`)
 * Using `[[...index]]` instead of `[...index]` is mandatory in Next.js App Router for Sanity Studio.
 * `[[...index]]` matches both `/studio` (root) and all deep Studio child routes like `/studio/structure/portfolio`.
 * A single catch-all `[...index]` would throw a 404 error when hitting `/studio` directly.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
