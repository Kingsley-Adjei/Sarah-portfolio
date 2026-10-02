import { defineType, defineField } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Portfolio Folder / Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Folder Name',
      type: 'string',
      description: 'e.g. Directing, Screenwriting, Performance, Commercials, Behind The Scenes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Folder Description',
      type: 'text',
      rows: 3,
      description: 'Brief overview displayed when opening this folder',
    }),
    defineField({
      name: 'iconName',
      title: 'Folder Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Film Roll (Directing / BTS)', value: 'film' },
          { title: 'Clapperboard (Screenwriting)', value: 'clapperboard' },
          { title: 'Video Camera (Performance)', value: 'video' },
          { title: 'Sparkles (Production)', value: 'sparkles' },
        ],
      },
      description: 'Icon displayed on the 3D folder header modal',
    }),
    defineField({
      name: 'projects',
      title: 'Projects in this Folder',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      description: 'Add and arrange picture & video projects inside this folder',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
