import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { formatDate } from "@/lib/format";
import { getPostBySlug } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getPostBySlug(slug)) as BlogPost | null;

  if (!post) notFound();

  return (
    <div className="main-layout">
      <main>
        <p style={{ marginBottom: 8 }}>
          <Link href="/blog" className="btn">
            ← Back to Blog
          </Link>
        </p>
        <Section title={post.title}>
          <time
            style={{ display: "block", fontSize: 10, color: "#555", marginBottom: 12 }}
          >
            {formatDate(post.date)}
          </time>
          {post.images?.length ? (
            <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {post.images.map((image, index) => (
                <SimpleImage
                  key={`${post._id}-${index}`}
                  image={image}
                  alt={image.alt || post.title}
                />
              ))}
            </div>
          ) : null}
          <div className="post-body">
            {post.body ? <PortableText value={post.body} /> : <p>{post.excerpt}</p>}
          </div>
        </Section>
      </main>
    </div>
  );
}
