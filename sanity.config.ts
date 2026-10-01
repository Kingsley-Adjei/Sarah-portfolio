import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || ''
const isValidProjectId = /^[a-z0-9-]+$/i.test(rawProjectId)
const projectId = isValidProjectId ? rawProjectId : 'placeholder-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId,
  dataset,

  // Base path MUST match Next.js App Router path '/studio'
  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

