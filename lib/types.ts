import type { PortableTextBlock } from "sanity";

export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
};

export type PlatformLink = {
  platform: string;
  url: string;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type SiteSettings = {
  bandName?: string;
  contactEmail?: string;
  guestbookLink?: string;
  socialLinks?: SocialLink[];
};

export type Release = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: SanityImage;
  platformLinks?: PlatformLink[];
  releaseDate?: string;
};

export type Show = {
  _id: string;
  title: string;
  date?: string;
  location?: string;
  setTime?: string;
  description?: string;
  photoGalleryLink?: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug?: string;
  date?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  images?: SanityImage[];
};

export type Video = {
  _id: string;
  title: string;
  embedLink?: string;
  description?: string;
};

export type GalleryImage = {
  _id: string;
  image?: SanityImage;
  caption?: string;
  category?: string;
};

export type SketchLyric = {
  _id: string;
  title: string;
  text?: string;
  image?: SanityImage;
  date?: string;
};

export type HomePageData = {
  featuredRelease?: Release;
  recentShows?: Show[];
  mediaImages?: GalleryImage[];
  recentPosts?: BlogPost[];
  sketchesLyrics?: SketchLyric[];
};
