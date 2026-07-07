import { defineField, defineType } from "sanity";

export const productVariant = defineType({
  name: "productVariant",
  title: "Variant (size / style)",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Small", "Large", "Black / M"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "sku",
      title: "SKU (optional)",
      type: "string"
    }),
    defineField({
      name: "priceOverride",
      title: "Price override (USD, optional)",
      type: "number",
      description: "Only if this variant costs a different amount than the base price.",
      validation: (Rule) => Rule.min(0)
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: { title: "label", subtitle: "sku" }
  }
});
