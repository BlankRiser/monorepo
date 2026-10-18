"use client";

import type { Work } from "@workspace/data";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface WorkItemProps {
  work: Work;
  index: number;
  subtitle?: string;
}

export const WorkItem = ({ work, index, subtitle }: WorkItemProps) => {
  const displaySubtitle = subtitle ?? work.role;

  return (
    <motion.div
      key={work.slug}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.04,
      }}
    >
      <Link
        href={`/work/${work.slug}`}
        className={cn([
          "group flex items-center justify-between gap-4 py-3 px-3 -mx-3 rounded-lg",
          "transition-colors duration-200",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
        ])}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="relative w-16 shrink-0 aspect-video rounded-sm overflow-hidden bg-neutral-800 dark:bg-transparent"
            style={
              {
                viewTransitionName: `work-image-${work.slug}`,
              } as React.CSSProperties
            }
          >
            <Image
              src={work.image}
              alt={work.company}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className="font-medium text-neutral-900 dark:text-neutral-100 truncate"
              style={
                {
                  viewTransitionName: `work-title-${work.slug}`,
                } as React.CSSProperties
              }
            >
              {work.company}
            </span>
            <span
              className="text-sm text-neutral-500 dark:text-neutral-400 truncate"
              title={displaySubtitle}
            >
              {displaySubtitle}
            </span>
          </div>
        </div>
        <span className="text-sm text-neutral-400 dark:text-neutral-500 shrink-0">
          {work.year}
        </span>
      </Link>
    </motion.div>
  );
};
