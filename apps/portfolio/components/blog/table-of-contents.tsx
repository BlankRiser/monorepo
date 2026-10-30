"use client";

import React, { useEffect, useRef, useState } from "react";
import type { TableOfContentsItem } from "@workspace/writing";
import { cn } from "@workspace/ui/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

function getLineWidth(level: number): number {
  switch (level) {
    case 1:
      return 32;
    case 2:
      return 24;
    case 3:
      return 16;
    case 4:
      return 12;
    case 5:
      return 9;
    case 6:
      return 7;
    default:
      return 20;
  }
}

function getItemIndent(level: number): number {
  return Math.max(8, (level - 2) * 12 + 8);
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  // Scroll spy: tracks which heading is currently active in the viewport
  useEffect(() => {
    if (items.length === 0) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // Bottom of page: activate last item
          const lastItem = items[items.length - 1];
          if (lastItem && scrollPosition + windowHeight >= documentHeight - 50) {
            setActiveId(lastItem.id);
            ticking = false;
            return;
          }

          // Find the heading that has passed the 120px offset from the viewport top
          let currentActive = items[0]?.id || "";
          for (const item of items) {
            const element = document.getElementById(item.id);
            if (element) {
              const top = element.getBoundingClientRect().top;
              if (top <= 120) {
                currentActive = item.id;
              } else {
                break;
              }
            }
          }

          if (currentActive) {
            setActiveId(currentActive);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  // Auto-scroll active item into view inside the popover when it opens
  useEffect(() => {
    if (isOpen && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [isOpen, activeId]);

  // Close on click outside or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleSelect = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Offset for sticky navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <nav
      ref={containerRef}
      aria-label="Table of contents"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "fixed right-3 sm:right-5 md:right-7 lg:right-8 top-1/2 -translate-y-1/2 z-40 select-none",
        className
      )}
    >
      {/* 1. Miniature Hierarchy Line Rail (Medium-style) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Table of contents indicator"
        className="group relative flex flex-col items-end gap-2 py-3 px-2 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          const lineWidth = getLineWidth(item.level);

          return (
            <span
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item.id);
              }}
              title={item.text}
              style={{ width: `${lineWidth}px` }}
              className={cn(
                "block rounded-full transition-all duration-200 cursor-pointer",
                isActive
                  ? "h-[3px] bg-emerald-600 dark:bg-[#94ffaf] shadow-[0_0_8px_rgba(5,150,105,0.4)] dark:shadow-[0_0_8px_rgba(148,255,175,0.6)]"
                  : "h-[2.5px] bg-neutral-300 dark:bg-neutral-700/80 group-hover:bg-neutral-400 dark:group-hover:bg-neutral-500 hover:!bg-neutral-600 dark:hover:!bg-neutral-300"
              )}
            />
          );
        })}
      </button>

      {/* 2. Floating Popover Menu on Hover/Click */}
      <div
        className={cn(
          "absolute right-full top-1/2 -translate-y-1/2 mr-3 w-72 sm:w-80 max-h-[75vh]",
          "flex flex-col rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90",
          "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md",
          "shadow-2xl shadow-black/10 dark:shadow-black/50 p-3",
          "transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 translate-x-0 pointer-events-auto scale-100"
            : "opacity-0 translate-x-2 pointer-events-none scale-[0.98]"
        )}
      >
        {/* Popover Header */}
        <div className="flex items-center justify-between px-2 pb-2.5 mb-1.5 border-b border-neutral-100 dark:border-neutral-800/80 text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          <span>Contents</span>
          <span className="text-[10px] lowercase text-neutral-400 font-normal">
            {items.length} sections
          </span>
        </div>

        {/* Scrollable List of Headings */}
        <div className="overflow-y-auto overflow-x-hidden space-y-0.5 pr-1 max-h-[calc(75vh-50px)]">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const indent = getItemIndent(item.level);

            return (
              <button
                key={item.id}
                ref={isActive ? activeItemRef : null}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={cn(
                  "group/item w-full text-left flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-colors",
                  isActive
                    ? "bg-emerald-500/10 dark:bg-[#94ffaf]/10 text-emerald-700 dark:text-[#94ffaf] font-medium"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50"
                )}
                style={{ paddingLeft: `${indent}px` }}
              >
                {/* Active Indicator Dot */}
                <span
                  className={cn(
                    "size-1.5 rounded-full shrink-0 transition-all",
                    isActive
                      ? "bg-emerald-600 dark:bg-[#94ffaf] opacity-100 shadow-[0_0_6px_rgba(5,150,105,0.6)] dark:shadow-[0_0_6px_rgba(148,255,175,0.8)]"
                      : "opacity-0"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate" title={item.text}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
