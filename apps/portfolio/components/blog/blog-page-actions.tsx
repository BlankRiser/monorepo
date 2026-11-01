"use client";

import { Check, Copy, Github } from "lucide-react";
import * as React from "react";

type CopyStatus = "idle" | "copied" | "error";

const actionClassName =
  "inline-flex size-10 items-center justify-center rounded-md border border-neutral-200/80 bg-neutral-100/70 text-neutral-700 transition-colors hover:bg-neutral-200/70 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800/70 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-400";

export function BlogPageActions({ sourceUrl }: { sourceUrl: string }) {
  const [copyStatus, setCopyStatus] = React.useState<CopyStatus>("idle");

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClassName}
        aria-label="View source on GitHub"
        title="View source on GitHub"
      >
        <Github className="size-4" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={copyPageLink}
        className={actionClassName}
        aria-label="Copy page link"
        title="Copy page link"
      >
        {copyStatus === "copied" ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
      {copyStatus === "copied" && (
        <span role="status" className="sr-only">Link copied</span>
      )}
      {copyStatus === "error" && (
        <span role="status" className="text-xs text-neutral-600 dark:text-neutral-400">
          Copy the address from your browser instead.
        </span>
      )}
    </div>
  );
}
