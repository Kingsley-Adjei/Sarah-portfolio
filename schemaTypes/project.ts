import { defineType, defineField } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project (Film, Video or Picture)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
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
      name: 'category',
      title: 'Folder / Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Select which folder this picture/video belongs to',
    }),
    defineField({
      name: 'role',
      title: 'Role / Credit',
      type: 'string',
      description: 'e.g. Director / Co-Writer, Lead Performer, Executive Producer',
    }),
    defineField({
      name: 'year',
      title: 'Release Year',
      type: 'string',
      description: 'e.g. 2025',
    }),

    // --- PICTURE ASSET UPLOAD ---
    defineField({
      name: 'mainImage',
      title: 'Main Picture Asset',
      type: 'image',
      description: 'Upload high-resolution thumbnail or poster picture',
      options: {
        hotspot: true, // Enables interactive cropping focus point
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),

    // --- VIDEO ASSET UPLOAD & LINK ---
    defineField({
      name: 'videoFile',
      title: 'Video File Upload',
      type: 'file',
      description: 'Upload direct video file (.mp4, .mov, .webm)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Video URL / Stream Link',
      type: 'url',
      description: 'YouTube, Vimeo, or external video streaming URL link',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'deploymentUrl',
      title: 'External Site Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'role',
      media: 'mainImage',
    },
  },
})
