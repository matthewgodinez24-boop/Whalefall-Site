import Link from "next/link";
import { Section } from "@/components/section";
import { formatDate } from "@/lib/format";
import { getPosts } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";

const fallbackPosts: BlogPost[] = [
  {
    _id: "fallback-blog",
    title: "First note from Whalefall",
    date: "2026-05-05",
    excerpt: "Add blog posts in Sanity and this page becomes the band journal."
  }
];

export default async function BlogPage() {
  const posts = ((await getPosts()) as BlogPost[] | null) || fallbackPosts;

  return (
    <div className="main-layout">
      <main>
        <Section title="Blog">
          <div className="blog-posts">
            {posts.map((post) => (
              <article key={post._id} className="blog-post-card">
                <h2>
                  {post.slug ? (
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  ) : (
                    post.title
                  )}
                </h2>
                <time>{formatDate(post.date)}</time>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
              </article>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
