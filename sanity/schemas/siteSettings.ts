import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "bandName",
      title: "Band Name",
      type: "string",
      initialValue: "Whalefall",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.email()
    }),
    defineField({
      name: "guestbookLink",
      title: "Guestbook Link",
      type: "url"
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "socialLink" }]
    })
  ],
  preview: {
    prepare: () => ({
      title: "Site Settings"
    })
  }
});
