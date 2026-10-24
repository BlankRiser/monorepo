import React from "react";
import Link from "next/link";
import { getSeriesNavigation } from "@workspace/writing";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BlogFooterProps {
  slugPath: string;
}

export function BlogFooter({ slugPath }: BlogFooterProps) {
  const seriesNav = getSeriesNavigation(slugPath);

  return (
    <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      {/* Series Next / Previous */}
      {seriesNav && (seriesNav.prev || seriesNav.next) && (
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
            {seriesNav.seriesTitle} Series
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {seriesNav.prev ? (
              <Link
                href={seriesNav.prev.permalink}
                className="group flex flex-col rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
              >
                <span className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                  Previous Part
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1">
                  {seriesNav.prev.frontmatter.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {seriesNav.next && (
              <Link
                href={seriesNav.next.permalink}
                className="group flex flex-col text-right rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs text-neutral-400 mb-1">
                  Next Part
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1">
                  {seriesNav.next.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Return to Blog */}
      <div className="flex items-center justify-between py-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to all writing</span>
        </Link>
      </div>
    </footer>
  );
}
