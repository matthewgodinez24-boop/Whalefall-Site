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
      title: "Embed Link",
      type: "url",
      description: "Use the embed URL, such as https://www.youtube.com/embed/VIDEO_ID."
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
