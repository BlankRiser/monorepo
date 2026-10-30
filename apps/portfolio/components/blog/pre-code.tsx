"use client";

import React, { useRef } from "react";
import { Mermaid } from "./mermaid";
import { CopyButton } from "./copy-button";
import { cn } from "@workspace/ui/lib/utils";

interface PreCodeProps extends React.HTMLAttributes<HTMLPreElement> {
  "data-language"?: string;
}

function extractLineText(lineNode: React.ReactNode): string {
  if (typeof lineNode === "string") return lineNode;
  if (typeof lineNode === "number") return String(lineNode);
  if (Array.isArray(lineNode)) return lineNode.map(extractLineText).join("");
  if (React.isValidElement(lineNode) && lineNode.props) {
    return extractLineText(
      (lineNode.props as { children?: React.ReactNode }).children
    );
  }
  return "";
}

function extractChartCode(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) {
    return node.map(extractLineText).join("\n");
  }
  if (React.isValidElement(node) && node.props) {
    const children = (node.props as { children?: React.ReactNode }).children;
    if (Array.isArray(children)) {
      return children.map(extractLineText).join("\n");
    }
    return extractLineText(children);
  }
  return "";
}

export function PreCode({
  children,
  className,
  "data-language": dataLanguage,
  ...props
}: PreCodeProps) {
  const preRef = useRef<HTMLPreElement>(null);

  // Check if child is code block
  const isCode = React.isValidElement(children);
  const childProps = isCode
    ? (children.props as { className?: string; children?: React.ReactNode })
    : undefined;
  const childClassName = childProps?.className || "";

  // Check if language is mermaid
  const isMermaid =
    dataLanguage === "mermaid" ||
    childClassName.includes("language-mermaid") ||
    className?.includes("language-mermaid");

  if (isMermaid) {
    const chartCode = extractChartCode(childProps?.children || children).trim();
    if (chartCode) {
      return <Mermaid chart={chartCode} />;
    }
  }

  // Get language from data attribute or class
  const langMatch =
    dataLanguage ||
    childClassName.match(/language-(\w+)/)?.[1] ||
    className?.match(/language-(\w+)/)?.[1] ||
    "";
  const displayLang = langMatch ? langMatch.toLowerCase() : "";

  // Helper to extract text for copy button
  const getRawText = (): string => {
    if (preRef.current) {
      return preRef.current.innerText || "";
    }
    if (typeof childProps?.children === "string") {
      return childProps.children;
    }
    return extractChartCode(childProps?.children || children);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
      {displayLang && (
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-900/60 px-4 py-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="uppercase tracking-wider text-[11px]">
            {displayLang}
          </span>
          <CopyButton text={getRawText()} />
        </div>
      )}
      {!displayLang && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton text={getRawText()} />
        </div>
      )}
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto p-4 text-xs font-mono leading-relaxed",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
