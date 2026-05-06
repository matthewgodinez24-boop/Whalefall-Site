import { defineField, defineType } from "sanity";

export const show = defineType({
  name: "show",
  title: "Shows",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Show Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date"
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string"
    }),
    defineField({
      name: "setTime",
      title: "Set Time",
      type: "string",
      description: "Example: 8:15 pm, doors at 7, or TBD."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5
    }),
    defineField({
      name: "photoGalleryLink",
      title: "Photo Gallery Link",
      type: "url",
      description: "Paste a gallery page, Google Drive folder, or other photo link."
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date"
    }
  }
});
