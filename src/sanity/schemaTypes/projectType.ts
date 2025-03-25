import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 10
    }),
    defineField({
      name: 'site',
      type: 'url',
    }),
    defineField({
      name: 'git',
      type: 'url',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})
