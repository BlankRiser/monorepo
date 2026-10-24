"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied code" : "Copy code"}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
        className
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}
