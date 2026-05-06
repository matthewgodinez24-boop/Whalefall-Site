import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["siteSettings", "homepage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Whalefall CMS")
    .items([
      S.listItem()
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Homepage Featured Content")
        .schemaType("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !singletonTypes.has(id) : true;
      })
    ]);
