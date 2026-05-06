import { defineField, defineType } from "sanity";

export const release = defineType({
  name: "release",
  title: "Releases",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "date"
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }]
    }),
    defineField({
      name: "platformLinks",
      title: "Platform Links",
      type: "array",
      of: [{ type: "platformLink" }]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "releaseDate",
      media: "coverImage"
    }
  }
});
