import React from "react";
import katex from "katex";
import { cn } from "@workspace/ui/lib/utils";

interface LatexProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function Latex({ math, block = false, className }: LatexProps) {
  const html = katex.renderToString(math, {
    displayMode: block,
    throwOnError: false,
  });

  if (block) {
    return (
      <div
        className={cn(
          "my-6 overflow-x-auto py-3 text-center text-neutral-900 dark:text-neutral-100",
          className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={cn("inline-block px-0.5", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
