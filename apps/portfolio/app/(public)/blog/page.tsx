import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@workspace/writing";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering notes, system architecture, and deep-dive technical articles by Ram Shankar.",
  alternates: {
    canonical: "https://ram.codes/blog",
  },
  openGraph: {
    title: "Writing | ram.codes",
    description:
      "Engineering notes, system architecture, and deep-dive technical articles by Ram Shankar.",
    url: "https://ram.codes/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | ram.codes",
    description:
      "Engineering notes, system architecture, and deep-dive technical articles by Ram Shankar.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts({
    includeDrafts:
      process.env.NODE_ENV !== "production" ||
      process.env.SHOW_DRAFTS === "true",
  });

  // Group into series roots
  const seriesRoots = posts.filter((p) => p.isSeriesRoot);

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <section className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-10">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Writing
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Essays, architectural studies, and technical notes on systems design,
          interface engineering, and modular web foundations.
        </p>
      </section>

      {/* Series Section */}
      {seriesRoots.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <BookOpen className="size-4" />
            <span>Curated Series</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {seriesRoots.map((series) => (
              <Link
                key={series.slugPath}
                href={series.permalink}
                className="group flex flex-col justify-between rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 p-6 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/60"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-neutral-200 dark:bg-neutral-800 px-2.5 py-0.5 text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                      Multi-part Series
                    </span>
                    {series.frontmatter.draft && (
                      <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-600 dark:text-amber-400">
                        Draft
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4 decoration-neutral-400">
                    {series.frontmatter.title}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {series.frontmatter.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {series.readingTime.text}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100">
                    Explore Series
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Articles Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <span>All Articles ({posts.length})</span>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {posts.map((post) => {
            const formattedDate = new Date(
              post.frontmatter.date
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article key={post.slugPath} className="py-6 first:pt-0">
                <Link
                  href={post.permalink}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4 decoration-neutral-400">
                        {post.frontmatter.title}
                      </h3>
                      {post.frontmatter.draft && (
                        <span className="rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-mono text-amber-600 dark:text-amber-400">
                          Draft
                        </span>
                      )}
                      {post.frontmatter.series?.title && (
                        <span className="rounded border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-[10px] text-neutral-500">
                          {post.frontmatter.series.title}
                        </span>
                      )}
                    </div>
                    {post.frontmatter.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 max-w-2xl leading-relaxed">
                        {post.frontmatter.description}
                      </p>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-1 text-xs text-neutral-400 mt-2 sm:mt-0 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {formattedDate}
                    </span>
                    <span>{post.readingTime.text}</span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
