import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date"
    }),
    defineField({
      name: "excerpt",
      title: "Short Excerpt",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }]
        }
      ]
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date"
    }
  }
});
