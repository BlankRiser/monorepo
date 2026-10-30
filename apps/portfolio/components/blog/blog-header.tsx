import React from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@workspace/writing";
import { AlertCircle, Calendar, Clock, User } from "lucide-react";

interface BlogHeaderProps {
  post: BlogPostMeta;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const { frontmatter, slug, readingTime } = post;

  // Build breadcrumb segments
  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    ...slug.slice(0, -1).map((segment, index) => {
      const href = `/blog/${slug.slice(0, index + 1).join("/")}`;
      const label = segment
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
      return { label, href };
    }),
  ];

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="mb-10 pb-8 border-b border-neutral-200 dark:border-neutral-800">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-500">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index > 0 && <span className="text-neutral-300 dark:text-neutral-700">/</span>}\n            <Link
              href={crumb.href}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              {crumb.label}
            </Link>
          </React.Fragment>
        ))}
        <span className="text-neutral-300 dark:text-neutral-700">/</span>
        <span className="truncate text-neutral-800 dark:text-neutral-200 font-medium">
          {frontmatter.title}
        </span>
      </nav>

      {/* Draft banner */}
      {frontmatter.draft && (
        <div className="mb-6 flex items-center gap-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400">
          <AlertCircle className="size-4 shrink-0" />
          <span>This post is a draft and is only visible in development or with draft mode enabled.</span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4 leading-tight">
        {frontmatter.title}
      </h1>

      {/* Description */}
      {frontmatter.description && (
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
          {frontmatter.description}
        </p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-1.5">
          <User className="size-3.5" />
          <span>{frontmatter.author || "Ram Shankar"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5" />
          <time dateTime={frontmatter.date}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5" />
          <span>{readingTime.text}</span>
        </div>
      </div>

      {/* Tags */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 lowercase"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
