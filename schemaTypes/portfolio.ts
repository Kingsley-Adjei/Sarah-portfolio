import { defineType, defineField } from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio & Site Content',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Me' },
    { name: 'categories', title: 'Portfolio Folders' },
    { name: 'settings', title: 'Global & Contact Settings' },
  ],
  fields: [
    // ==========================================
    // 1. HERO SECTION TAB
    // ==========================================
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      group: 'hero',
      description: 'e.g. SARAH ADJEI — FILMMAKER & VISUAL DIRECTOR',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle Text',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'e.g. FRAMING STORIES THAT LINGER • ACCRA, GHANA',
    }),
    defineField({
      name: 'heroSetImage',
      title: 'Hero Set Banner Picture',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Main camera set banner picture on home page',
    }),
    defineField({
      name: 'ctaText',
      title: 'Call To Action Text',
      type: 'string',
      group: 'hero',
      description: 'e.g. Get In Touch',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call To Action Link / Mail',
      type: 'string',
      group: 'hero',
      description: 'e.g. mailto:Abena_koblyn@gmail.com',
    }),

    // ==========================================
    // 2. ABOUT ME TAB (ALL 4 PICTURES + TEXTS + QUOTE)
    // ==========================================
    defineField({
      name: 'aboutHeaderTitle',
      title: 'About Header Title',
      type: 'string',
      group: 'about',
      description: 'e.g. KNOW SARAH',
    }),
    defineField({
      name: 'aboutHeroImage',
      title: '1. About Header Banner Picture',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
      description: 'Banner picture behind "KNOW SARAH" title',
    }),
    defineField({
      name: 'aboutPortraitImage',
      title: '2. Sarah Portrait Picture',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
      description: 'Main portrait picture next to biography text',
    }),
    defineField({
      name: 'aboutCrewImage',
      title: '3. On-Set Camera Crew Picture',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
      description: 'Picture next to philosophy quote',
    }),
    defineField({
      name: 'aboutBannerImage',
      title: '4. Bottom "HIT ME UP" Banner Picture',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
      description: 'Background picture for bottom collaboration section',
    }),
    defineField({
      name: 'biography',
      title: 'Biography (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'about',
    }),
    defineField({
      name: 'philosophyQuote',
      title: 'Filmmaking Philosophy Quote',
      type: 'text',
      rows: 4,
      group: 'about',
      description: 'e.g. "For me, cinema is a medium of raw vulnerability..."',
    }),
    defineField({
      name: 'skills',
      title: 'Technical Skills & Disciplines',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'about',
    }),
    defineField({
      name: 'resumePdf',
      title: 'Downloadable Resume (PDF File)',
      type: 'file',
      options: { accept: '.pdf' },
      group: 'about',
    }),

    // ==========================================
    // 3. PORTFOLIO FOLDERS TAB
    // ==========================================
    defineField({
      name: 'portfolioCategories',
      title: '3D Category Folders',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      group: 'categories',
      description: 'Select and order category folders displayed in the 3D grid (Directing, Screenwriting, Performance, Production, BTS)',
    }),

    // ==========================================
    // 4. GLOBAL & CONTACT SETTINGS TAB
    // ==========================================
    defineField({
      name: 'contactEmail',
      title: 'Contact Email Address',
      type: 'string',
      group: 'settings',
      description: 'e.g. Abena_koblyn@gmail.com',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone Number',
      type: 'string',
      group: 'settings',
      description: 'e.g. +233 27 723 3774',
    }),
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
      title: 'Site Logo Picture',
      type: 'image',
      options: { hotspot: true },
      group: 'settings',
    }),
  ],
})
