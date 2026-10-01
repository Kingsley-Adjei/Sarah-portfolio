import { createClient } from 'next-sanity'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || ''

// Sanity project IDs MUST only contain lowercase letters, numbers, and dashes (no underscores, spaces, or special chars)
const isValidProjectId = /^[a-z0-9-]+$/i.test(rawProjectId)

if (!isValidProjectId && rawProjectId) {
  console.warn(
    `[Sanity Client Warning] Invalid NEXT_PUBLIC_SANITY_PROJECT_ID "${rawProjectId}". ` +
      `Sanity Project IDs can only contain letters, numbers, and dashes (e.g. "pv8y601p").`
  )
}

export const projectId = isValidProjectId ? rawProjectId : 'placeholder-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

