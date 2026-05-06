import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { formatDate } from "@/lib/format";
import { getPostBySlug } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getPostBySlug(slug)) as BlogPost | null;

  if (!post) notFound();

  return (
    <main>
      <Section title={post.title}>
        <p className="text-sm text-faded">{formatDate(post.date)}</p>
        {post.images?.length ? (
          <div className="mb-4 space-y-3">
            {post.images.map((image, index) => (
              <SimpleImage key={`${post._id}-${index}`} image={image} alt={image.alt || post.title} />
            ))}
          </div>
        ) : null}
        <div className="prose prose-sm max-w-none prose-headings:font-normal prose-a:text-[#154c8f]">
          {post.body ? <PortableText value={post.body} /> : <p>{post.excerpt}</p>}
        </div>
      </Section>
    </main>
  );
}
