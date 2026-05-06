import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "replace-me";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "whalefall",
  title: "Whalefall CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});
