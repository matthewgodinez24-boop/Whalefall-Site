import { blogPost } from "./blogPost";
import { galleryImage } from "./galleryImage";
import { homepage } from "./homepage";
import { platformLink } from "./objects/platformLink";
import { productVariant } from "./objects/productVariant";
import { socialLink } from "./objects/socialLink";
import { tourDate } from "./objects/tourDate";
import { product } from "./product";
import { release } from "./release";
import { show } from "./show";
import { siteSettings } from "./siteSettings";
import { sketchLyric } from "./sketchLyric";
import { tour } from "./tour";
import { video } from "./video";

export const schemaTypes = [
  siteSettings,
  homepage,
  release,
  tour,
  show,
  blogPost,
  video,
  galleryImage,
  sketchLyric,
  product,
  platformLink,
  socialLink,
  tourDate,
  productVariant
];
