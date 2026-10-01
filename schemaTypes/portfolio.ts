import { defineType, defineField } from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio Content',
  type: 'document',
  // Content Groups (Tabs) inside Sanity Studio dashboard
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Me' },
    { name: 'projects', title: 'Projects Gallery' },
    { name: 'settings', title: 'Global Settings' },
  ],
  fields: [
    // --- HERO SECTION TAB ---
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required().error('Main headline is required'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle Text',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'string',
      group: 'hero',
    }),

    // --- ABOUT ME TAB ---
    defineField({
      name: 'biography',
      title: 'Biography (Rich Portable Text)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'about',
    }),
    defineField({
      name: 'skills',
      title: 'Technical Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'about',
    }),
    defineField({
      name: 'resumePdf',
      title: 'Downloadable Resume (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      group: 'about',
    }),

    // --- PROJECTS GALLERY TAB ---
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      group: 'projects',
    }),

    // --- GLOBAL SETTINGS TAB ---
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      group: 'settings',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright String',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'siteLogo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      group: 'settings',
    }),
  ],
})
