export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  bandName,
  contactEmail,
  guestbookLink,
  socialLinks
}`;

export const homePageQuery = `{
  "homepage": *[_type == "homepage"][0]{
    featuredRelease->{_id, title, description, coverImage, platformLinks, releaseDate},
    "recentShows": featuredShows[]->{_id, title, date, location, setTime, description, photoGalleryLink},
    "mediaImages": featuredMedia[]->{_id, image, caption, category},
    "recentPosts": featuredPosts[]->{_id, title, "slug": slug.current, date, excerpt},
    "sketchesLyrics": featuredSketchesLyrics[]->{_id, title, text, image, date}
  },
  "latestRelease": *[_type == "release"] | order(releaseDate desc, _createdAt desc)[0]{
    _id, title, description, coverImage, platformLinks, releaseDate
  },
  "recentShows": *[_type == "show"] | order(date desc, _createdAt desc)[0...2]{
    _id, title, date, location, setTime, description, photoGalleryLink
  },
  "mediaImages": *[_type == "galleryImage" && category in ["studio", "media"]] | order(_createdAt desc)[0...6]{
    _id, image, caption, category
  },
  "recentPosts": *[_type == "blogPost"] | order(date desc, _createdAt desc)[0...3]{
    _id, title, "slug": slug.current, date, excerpt
  },
  "sketchesLyrics": *[_type == "sketchLyric"] | order(date desc, _createdAt desc)[0...3]{
    _id, title, text, image, date
  }
}`;

export const releasesQuery = `*[_type == "release"] | order(releaseDate desc, _createdAt desc){
  _id, title, description, coverImage, platformLinks, releaseDate
}`;

export const postsQuery = `*[_type == "blogPost"] | order(date desc, _createdAt desc){
  _id, title, "slug": slug.current, date, excerpt
}`;

export const postBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, date, excerpt, body, images
}`;

export const videosQuery = `*[_type == "video"] | order(_createdAt desc){
  _id, title, embedLink, description
}`;

export const galleryQuery = `*[_type == "galleryImage"] | order(_createdAt desc){
  _id, image, caption, category
}`;
