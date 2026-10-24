"use client";

import React, { useEffect, useState } from "react";
import type { TableOfContentsItem } from "@workspace/writing";
import { List } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "0% 0% -70% 0%",
        threshold: 0,
      }
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "my-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-4 text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
        <List className="size-3.5" />
        <span>Table of Contents</span>
      </div>
      <ul className="flex flex-col gap-1.5 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={cn(
                "transition-colors",
                item.level === 3 ? "pl-3 text-neutral-500" : "text-neutral-700 dark:text-neutral-300"
              )}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  "hover:underline underline-offset-4 block py-0.5 transition-colors",
                  isActive
                    ? "font-medium text-neutral-900 dark:text-neutral-50 underline decoration-neutral-900 dark:decoration-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
