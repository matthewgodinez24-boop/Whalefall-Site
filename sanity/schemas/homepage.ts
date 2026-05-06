import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage Featured Content",
  type: "document",
  fields: [
    defineField({
      name: "featuredRelease",
      title: "New Release Announcement",
      type: "reference",
      to: [{ type: "release" }]
    }),
    defineField({
      name: "featuredShows",
      title: "Recent Shows",
      type: "array",
      of: [{ type: "reference", to: [{ type: "show" }] }],
      validation: (Rule) => Rule.max(4)
    }),
    defineField({
      name: "featuredMedia",
      title: "Studio / Media Carousel Images",
      type: "array",
      of: [{ type: "reference", to: [{ type: "galleryImage" }] }]
    }),
    defineField({
      name: "featuredPosts",
      title: "Recent Blog Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      validation: (Rule) => Rule.max(5)
    }),
    defineField({
      name: "featuredSketchesLyrics",
      title: "Sketches / Lyrics",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sketchLyric" }] }],
      validation: (Rule) => Rule.max(5)
    })
  ],
  preview: {
    prepare: () => ({
      title: "Homepage Featured Content"
    })
  }
});
