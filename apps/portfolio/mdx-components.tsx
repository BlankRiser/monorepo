import React from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/blog/callout";
import { CustomImage } from "@/components/blog/custom-image";
import { CustomLink } from "@/components/blog/custom-link";
import { Latex } from "@/components/blog/latex";
import { Mermaid } from "@/components/blog/mermaid";
import { PreCode } from "@/components/blog/pre-code";
import { SeriesPosts } from "@/components/blog/series-posts";
import { Hash } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement(node) && node.props) {
    return getNodeText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, className, ...props }) => (
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 mt-10 mb-4 first:mt-0 break-words",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, className, id, ...props }) => {
      const headingText = getNodeText(children);
      const headingId = id || slugify(headingText);
      return (
        <h2
          id={headingId}
          className={cn(
            "group flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-12 mb-4 scroll-mt-24 break-words",
            className
          )}
          {...props}
        >
          <span>{children}</span>
          <a
            href={`#${headingId}`}
            aria-label={`Link to ${headingText}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <Hash className="size-4" />
          </a>
        </h2>
      );
    },
    h3: ({ children, className, id, ...props }) => {
      const headingText = getNodeText(children);
      const headingId = id || slugify(headingText);
      return (
        <h3
          id={headingId}
          className={cn(
            "group flex items-center gap-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mt-8 mb-3 scroll-mt-24 break-words",
            className
          )}
          {...props}
        >
          <span>{children}</span>
          <a
            href={`#${headingId}`}
            aria-label={`Link to ${headingText}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <Hash className="size-3.5" />
          </a>
        </h3>
      );
    },
    h4: ({ children, className, id, ...props }) => {
      const headingText = getNodeText(children);
      const headingId = id || slugify(headingText);
      return (
        <h4
          id={headingId}
          className={cn(
            "text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mt-6 mb-2 scroll-mt-24",
            className
          )}
          {...props}
        >
          {children}
        </h4>
      );
    },
    p: ({ children, className, ...props }) => (
      <p
        className={cn(
          "text-base leading-relaxed text-neutral-700 dark:text-neutral-300 my-4 max-w-[72ch]",
          className
        )}
        {...props}
      >
        {children}
      </p>
    ),
    a: (props) => <CustomLink {...props} />,
    img: (props) => (
      <CustomImage
        src={props.src || ""}
        alt={props.alt || ""}
        caption={props.title}
        {...props}
      />
    ),
    pre: (props) => <PreCode {...props} />,
    code: ({ children, className, ...props }) => (
      <code className={className} {...props}>
        {children}
      </code>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote
        className={cn(
          "my-6 rounded-r-lg border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-900/40 py-2.5 px-4 italic text-neutral-700 dark:text-neutral-300",
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        className={cn(
          "my-4 list-disc pl-6 space-y-1 text-base text-neutral-700 dark:text-neutral-300 max-w-[72ch]",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ol
        className={cn(
          "my-4 list-decimal pl-6 space-y-1 text-base text-neutral-700 dark:text-neutral-300 max-w-[72ch]",
          className
        )}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }) => (
      <li className={cn("leading-relaxed", className)} {...props}>
        {children}
      </li>
    ),
    table: ({ children, className, ...props }) => (
      <div className="my-6 w-full overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className={cn("w-full text-left text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, className, ...props }) => (
      <thead
        className={cn(
          "border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 font-medium text-neutral-900 dark:text-neutral-100",
          className
        )}
        {...props}
      >
        {children}
      </thead>
    ),
    tbody: ({ children, className, ...props }) => (
      <tbody
        className={cn(
          "divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300",
          className
        )}
        {...props}
      >
        {children}
      </tbody>
    ),
    tr: ({ children, className, ...props }) => (
      <tr
        className={cn(
          "transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20",
          className
        )}
        {...props}
      >
        {children}
      </tr>
    ),
    th: ({ children, className, ...props }) => (
      <th className={cn("p-3 font-semibold", className)} {...props}>
        {children}
      </th>
    ),
    td: ({ children, className, ...props }) => (
      <td className={cn("p-3 align-top", className)} {...props}>
        {children}
      </td>
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn("my-8 border-neutral-200 dark:border-neutral-800", className)}
        {...props}
      />
    ),

    // Custom named components for direct MDX use
    Callout,
    Mermaid,
    Latex,
    Image: CustomImage,
    Link: CustomLink,
    SeriesPosts,

    ...components,
  };
}
