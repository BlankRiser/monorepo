import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
} from "@workspace/writing";
import { getBlogSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogFooter } from "@/components/blog/blog-footer";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const source = await getBlogSource();
  return source.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const { frontmatter, permalink } = post;
  const canonicalUrl = `https://ram.codes${permalink}`;
  const ogImage = frontmatter.coverImage || "https://ram.codes/thumbnail.webp";

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: frontmatter.author || "Ram Shankar" }],
    keywords: frontmatter.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url: canonicalUrl,
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updatedAt || frontmatter.date,
      authors: [frontmatter.author || "Ram Shankar"],
      tags: frontmatter.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
      creator: "@blank_riser",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const source = await getBlogSource();
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const { render } = await page.data.load();
  const { body } = await render(getMDXComponents());

  // Generate JSON-LD Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt || post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author || "Ram Shankar",
      url: "https://ram.codes",
    },
    publisher: {
      "@type": "Person",
      name: "Ram Shankar",
      url: "https://ram.codes",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ram.codes${post.permalink}`,
    },
    keywords: post.frontmatter.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="w-full">
        <BlogHeader post={post} />
        <div className="prose-content">
          {body}
        </div>
        <BlogFooter slugPath={post.slugPath} />
      </article>
    </>
  );
}
