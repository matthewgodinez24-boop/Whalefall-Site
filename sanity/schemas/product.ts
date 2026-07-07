import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Merch",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Base price in US dollars, e.g. 25 for $25.00.",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }]
        }
      ],
      validation: (Rule) => Rule.min(1)
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Apparel", "Music (Vinyl/CD/Cassette)", "Prints", "Accessories", "Other"]
      }
    }),
    defineField({
      name: "variants",
      title: "Variants (sizes / styles)",
      type: "array",
      of: [{ type: "productVariant" }],
      description: "Add one per size/style. Leave empty for a single-option product (e.g. a CD)."
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      description: "Turn OFF to show the product as Sold Out. (Used when there are no variants.)",
      initialValue: true
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show near the top of the store / on the homepage.",
      initialValue: false
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order (optional)",
      type: "number",
      description: "Lower numbers show first."
    })
  ],
  preview: {
    select: { title: "title", subtitle: "price", media: "images.0" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle != null ? `$${subtitle}` : "", media };
    }
  }
});
