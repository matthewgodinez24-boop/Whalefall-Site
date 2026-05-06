import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Images",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string"
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["shows", "studio", "media", "flyers", "behind the scenes", "other"]
      }
    })
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "category",
      media: "image"
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled image",
        subtitle,
        media
      };
    }
  }
});
