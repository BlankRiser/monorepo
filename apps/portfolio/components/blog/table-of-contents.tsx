"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { TableOfContentsItem } from "@workspace/writing";
import { Search, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

function getLineWidth(level: number, isDense: boolean): number {
  if (isDense) {
    switch (level) {
      case 1:
        return 26;
      case 2:
        return 20;
      case 3:
        return 13;
      case 4:
        return 9;
      case 5:
        return 7;
      case 6:
        return 5;
      default:
        return 14;
    }
  }
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
  const [search, setSearch] = useState("");
  const [viewportHeight, setViewportHeight] = useState<number>(800);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLSpanElement | null>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Measure window height for viewport-bounded adaptive calculations
  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Filtered items based on optional search
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const query = search.toLowerCase().trim();
    return items.filter((item) => item.text.toLowerCase().includes(query));
  }, [items, search]);

  // Compute adaptive sizing metrics for the line rail so it NEVER overflows the screen
  const { lineHeight, gap, isScrollable, maxTrackHeight, isDense } =
    useMemo(() => {
      const maxAllowedHeight = Math.max(
        240,
        Math.min(viewportHeight - 160, 560)
      );
      const total = items.length;
      const dense = total > 40;

      let lHeight = 2.5;
      let targetGap = 6;

      if (total > 80) {
        lHeight = 2;
        targetGap = Math.max(
          1.5,
          (maxAllowedHeight - total * lHeight) / Math.max(1, total - 1)
        );
      } else if (total > 40) {
        lHeight = 2;
        targetGap = Math.max(
          2.5,
          Math.min(4.5, (maxAllowedHeight - total * lHeight) / (total - 1))
        );
      } else if (total > 20) {
        lHeight = 2.5;
        targetGap = 4;
      }

      const calculatedNatural = total * lHeight + (total - 1) * targetGap;
      const scrollable = calculatedNatural > maxAllowedHeight;

      return {
        lineHeight: lHeight,
        gap: targetGap,
        isScrollable: scrollable,
        maxTrackHeight: maxAllowedHeight,
        isDense: dense,
      };
    }, [items.length, viewportHeight]);

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

          // Heading that has passed the 120px offset from the viewport top
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

  // If the line rail has more lines than can fit within maxTrackHeight,
  // keep the active line centered within the rail track
  useEffect(() => {
    if (isScrollable && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeId, isScrollable]);

  // Auto-scroll the active item into view inside the popover
  useEffect(() => {
    if (isOpen && activeItemRef.current && !search) {
      activeItemRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [isOpen, activeId, search]);

  // Focus search input when popover opens with many items
  useEffect(() => {
    if (isOpen && items.length > 30) {
      // Small timeout to allow transition to start
      const t = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(t);
    }
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen, items.length]);

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
    }, 220);
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
      <div
        style={{
          maxHeight: `${maxTrackHeight}px`,
        }}
        className={cn(
          "relative flex flex-col items-end py-2 px-1.5 rounded-full",
          isScrollable && "overflow-y-auto no-scrollbar"
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Table of contents indicator"
          style={{ gap: `${gap}px` }}
          className="group relative flex flex-col items-end cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
        >
          {items.map((item) => {
            const isActive = activeId === item.id;
            const lineWidth = getLineWidth(item.level, isDense);

            return (
              <span
                key={item.id}
                ref={isActive ? activeLineRef : null}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item.id);
                }}
                title={item.text}
                style={{
                  width: `${lineWidth}px`,
                  height: isActive ? `${lineHeight + 0.5}px` : `${lineHeight}px`,
                }}
                className={cn(
                  "block rounded-full transition-all duration-200 cursor-pointer shrink-0",
                  isActive
                    ? "bg-emerald-600 dark:bg-[#94ffaf] shadow-[0_0_8px_rgba(5,150,105,0.4)] dark:shadow-[0_0_8px_rgba(148,255,175,0.6)]"
                    : "bg-neutral-300 dark:bg-neutral-700/80 group-hover:bg-neutral-400 dark:group-hover:bg-neutral-500 hover:!bg-neutral-600 dark:hover:!bg-neutral-300"
                )}
              />
            );
          })}
        </button>
      </div>

      {/* 2. Floating Popover Menu on Hover/Click */}
      <div
        style={{
          maxHeight: `${Math.min(viewportHeight - 140, 620)}px`,
        }}
        className={cn(
          "absolute right-full top-1/2 -translate-y-1/2 mr-3 w-72 sm:w-84 max-w-[calc(100vw-3.5rem)]",
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
        <div className="flex items-center justify-between px-1 pb-2 border-b border-neutral-100 dark:border-neutral-800/80 text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          <span>Table of Contents</span>
          <span className="text-[10px] lowercase text-neutral-400 font-normal">
            {filteredItems.length} {filteredItems.length === 1 ? "section" : "sections"}
          </span>
        </div>

        {/* Optional Search Filter when post has many headings (> 15) */}
        {items.length > 15 && (
          <div className="relative my-2">
            <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter sections..."
              className="w-full pl-8 pr-7 py-1 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/60 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        )}

        {/* Scrollable List of Headings */}
        <div className="overflow-y-auto overflow-x-hidden space-y-0.5 pr-1 flex-1 min-h-0">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-xs text-neutral-400">
              No matching sections found
            </div>
          ) : (
            filteredItems.map((item) => {
              const isActive = activeId === item.id;
              const indent = getItemIndent(item.level);
              const isH2 = item.level === 2;

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
                      : isH2
                      ? "text-neutral-800 dark:text-neutral-200 font-medium hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50"
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
            })
          )}
        </div>
      </div>
    </nav>
  );
}
