import { defineField, defineType } from "sanity";

export const sketchLyric = defineType({
  name: "sketchLyric",
  title: "Sketches / Lyrics",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date"
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 8
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "image"
    }
  }
});
