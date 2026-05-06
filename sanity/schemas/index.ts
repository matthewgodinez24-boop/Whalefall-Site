import { blogPost } from "./blogPost";
import { galleryImage } from "./galleryImage";
import { homepage } from "./homepage";
import { platformLink } from "./objects/platformLink";
import { socialLink } from "./objects/socialLink";
import { release } from "./release";
import { show } from "./show";
import { siteSettings } from "./siteSettings";
import { sketchLyric } from "./sketchLyric";
import { video } from "./video";

export const schemaTypes = [
  siteSettings,
  homepage,
  release,
  show,
  blogPost,
  video,
  galleryImage,
  sketchLyric,
  platformLink,
  socialLink
];
