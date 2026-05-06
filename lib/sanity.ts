import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import type { BlogPost, GalleryImage, Release, SanityImage, SiteSettings, Video } from "@/lib/types";
import {
  galleryQuery,
  homePageQuery,
  postBySlugQuery,
  postsQuery,
  releasesQuery,
  siteSettingsQuery,
  videosQuery
} from "@/lib/queries";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-01";

export const sanityReady = Boolean(projectId && projectId !== "your-project-id" && projectId !== "replace-me");

export const client = createClient({
  projectId: projectId || "replace-me",
  dataset,
  apiVersion,
  useCdn: true
});

const builder = imageUrlBuilder(client);

export function urlForImage(source?: SanityImage) {
  if (!sanityReady || !source?.asset?._ref) return null;
  return builder.image(source);
}

async function safeFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  if (!sanityReady) return null;
  try {
    return await client.fetch<T>(query, params || {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export const getSiteSettings = () => safeFetch<SiteSettings>(siteSettingsQuery);
export const getHomePage = () => safeFetch<unknown>(homePageQuery);
export const getReleases = () => safeFetch<Release[]>(releasesQuery);
export const getPosts = () => safeFetch<BlogPost[]>(postsQuery);
export const getPostBySlug = (slug: string) => safeFetch<BlogPost>(postBySlugQuery, { slug });
export const getVideos = () => safeFetch<Video[]>(videosQuery);
export const getGallery = () => safeFetch<GalleryImage[]>(galleryQuery);
