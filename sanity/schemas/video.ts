import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Videos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "embedLink",
      title: "Video Link",
      type: "url",
      description:
        "Paste any YouTube or Vimeo link — share link, watch page, shorts, or embed URL. The site converts it for you. Examples: https://youtu.be/ABC123 · https://www.youtube.com/watch?v=ABC123 · https://vimeo.com/123456."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "embedLink"
    }
  }
});
