"use client";

import { works } from "@/data/work";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

export const WorkSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="flex flex-col gap-6"
    >
      <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Work Experience
      </h2>
      <div className="flex flex-col gap-1">
        {works.map((work, index) => (
          <motion.div
            key={work.slug}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.1 + index * 0.05,
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
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {work.company}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                  {work.role} · {work.position}
                </span>
              </div>
              <span className="text-sm text-neutral-400 dark:text-neutral-500 shrink-0">
                {work.year}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
