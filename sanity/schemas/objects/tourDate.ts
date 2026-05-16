import { defineField, defineType } from "sanity";

export const tourDate = defineType({
  name: "tourDate",
  title: "Tour Date",
  type: "object",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      description: 'Venue name, or "TBD" if not booked yet.'
    })
  ],
  preview: {
    select: {
      date: "date",
      city: "city",
      venue: "venue"
    },
    prepare({ date, city, venue }) {
      return {
        title: `${city || "?"} — ${venue || "TBD"}`,
        subtitle: date
      };
    }
  }
});
