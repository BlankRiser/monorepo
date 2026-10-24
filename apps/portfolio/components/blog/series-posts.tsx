import React from "react";
import Link from "next/link";
import { getChildPosts, getAllPosts } from "@workspace/writing";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface SeriesPostsProps {
  seriesPath?: string;
  title?: string;
  className?: string;
}

export function SeriesPosts({
  seriesPath,
  title = "In this series",
  className,
}: SeriesPostsProps) {
  // If seriesPath provided, get child posts
  let posts = seriesPath ? getChildPosts(seriesPath) : [];

  // If none or not provided, get posts with matching series or current path
  if (posts.length === 0) {
    const all = getAllPosts({ includeDrafts: true });
    // Filter posts that are in series
    posts = all.filter((p) => !p.isSeriesRoot && p.slug.length > 1);
  }

  if (posts.length === 0) return null;

  return (
    <section
      className={cn(
        "my-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-5",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
        <BookOpen className="size-4" />
        <span>{title}</span>
      </div>
      <div className="flex flex-col divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
        {posts.map((post, index) => {
          const order = post.frontmatter.series?.order ?? index + 1;
          return (
            <Link
              key={post.slugPath}
              href={post.permalink}
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 py-3 transition-colors hover:text-black dark:hover:text-white"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-neutral-400 shrink-0">
                  {String(order).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-sm font-medium group-hover:underline underline-offset-4 decoration-neutral-400">
                    {post.frontmatter.title}
                  </h4>
                  {post.frontmatter.description && (
                    <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                      {post.frontmatter.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-xs text-neutral-400 pl-7 sm:pl-0">
                {post.frontmatter.draft && (
                  <span className="rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-mono text-amber-600 dark:text-amber-400">
                    Draft
                  </span>
                )}
                <span>{post.readingTime.text}</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
