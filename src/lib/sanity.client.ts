import { createClient } from 'next-sanity'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || ''
const isValidProjectId = /^[a-z0-9-]+$/i.test(rawProjectId)

export const projectId = isValidProjectId ? rawProjectId : 'placeholder-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})
