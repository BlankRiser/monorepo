import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CustomLink({
  href = "#",
  children,
  className,
  ...props
}: CustomLinkProps) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//");

  const isAnchor = href.startsWith("#");

  const baseClasses = cn(
    "inline-flex items-baseline gap-1 text-neutral-900 dark:text-neutral-100 font-medium underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-xs",
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        {...props}
      >
        <span>{children}</span>
        <ExternalLink className="inline size-3 self-center opacity-70 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  if (isAnchor) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses} {...props}>
      {children}
    </Link>
  );
}
