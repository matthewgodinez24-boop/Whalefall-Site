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
      rows: 8,
      description:
        "Paste the lyrics or sketch text here. Leave blank if you'd rather link out via the Source URL field below."
    }),
    defineField({
      name: "sourceName",
      title: "Source Name",
      type: "string",
      description:
        'Optional. Where the text came from — e.g. the songwriter\'s name, "the band", or another credit. Shown as small attribution below the text.'
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description:
        "Optional. If filled in, the source name above becomes a link."
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
