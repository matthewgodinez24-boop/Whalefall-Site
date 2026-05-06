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
    <main>
      <Section title="Blog">
        <div className="space-y-5">
          {posts.map((post) => (
            <article key={post._id}>
              <h2 className="m-0 text-xl font-normal">
                {post.slug ? <Link href={`/blog/${post.slug}`}>{post.title}</Link> : post.title}
              </h2>
              <p className="m-0 text-sm text-faded">{formatDate(post.date)}</p>
              {post.excerpt ? <p>{post.excerpt}</p> : null}
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
