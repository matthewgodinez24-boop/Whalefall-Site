import { defineField, defineType } from "sanity";

export const platformLink = defineType({
  name: "platformLink",
  title: "Music Platform Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: ["Bandcamp", "Spotify", "Apple Music", "SoundCloud", "YouTube", "Other"]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] })
    })
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url"
    }
  }
});
