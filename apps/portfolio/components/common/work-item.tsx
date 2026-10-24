"use client";

import type { Work } from "@workspace/data";
import { cn } from "@workspace/ui/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface WorkItemProps {
  work: Work;
  index: number;
  subtitle?: string;
  showRole?: boolean;
}

export const WorkItem = ({
  work,
  index,
  subtitle,
  showRole = true,
}: WorkItemProps) => {
  const shouldReduceMotion = useReducedMotion();
  const description = subtitle ?? work.brief ?? work.description;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1] as const,
              delay: index * 0.03,
            }
      }
    >
      <Link
        href={`/work/${work.slug}`}
        className={cn(
          "group flex items-center justify-between gap-4 rounded-lg p-2.5 -mx-2.5 transition-colors duration-150",
          "hover:bg-neutral-100 dark:hover:bg-neutral-900/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus-visible:ring-offset-2",
        )}
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          {/* Logo container: dark background in both light and dark themes */}
          <div
            className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-neutral-800 bg-neutral-950 p-2 flex items-center justify-center"
            style={
              {
                viewTransitionName: `work-image-${work.slug}`,
              } as React.CSSProperties
            }
          >
            <div className="relative h-full w-full">
              <Image
                src={work.image}
                alt={work.company}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className="font-medium text-sm text-neutral-900 dark:text-neutral-100 truncate"
              style={
                {
                  viewTransitionName: `work-title-${work.slug}`,
                } as React.CSSProperties
              }
            >
              {work.company}
            </span>

            {description ? (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-0.5 shrink-0 text-right">
          {showRole && work.role ? (
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {work.role}
            </span>
          ) : null}
          <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
            {work.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
