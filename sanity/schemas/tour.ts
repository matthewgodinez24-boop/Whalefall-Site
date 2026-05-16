import { defineField, defineType } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tours",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tour Title",
      type: "string",
      description: 'Example: "West Coast Tour 2026"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "withBands",
      title: "With Bands",
      type: "array",
      of: [{ type: "string" }],
      description: "Other bands on the tour (e.g. Sleepy Cat)."
    }),
    defineField({
      name: "posterImage",
      title: "Tour Poster",
      type: "image",
      options: { hotspot: true },
      description: "The tour flyer / poster image."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "dates",
      title: "Tour Dates",
      type: "array",
      of: [{ type: "tourDate" }]
    }),
    defineField({
      name: "isUpcoming",
      title: "Show on homepage as upcoming?",
      type: "boolean",
      initialValue: true,
      description:
        "Toggle off after the tour wraps up so it stops showing on the homepage."
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "posterImage"
    }
  }
});
