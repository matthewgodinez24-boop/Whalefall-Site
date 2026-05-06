import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: ["Instagram", "TikTok", "YouTube", "Bandcamp", "Spotify", "Twitter/X", "Facebook", "Email", "Other"]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https", "mailto"] })
    })
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url"
    }
  }
});
