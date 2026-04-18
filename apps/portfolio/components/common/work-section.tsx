"use client";

import { works } from "@workspace/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";

export const WorkSection = () => {
  const [filter, setFilter] = useState<"FTE" | "Freelance">("FTE");

  const filteredWorks = useMemo(() => {
    return works.filter((work) => work.position === filter);
  }, [filter]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          Work Experience
        </h2>
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as "FTE" | "Freelance")}
        >
          <SelectTrigger className="w-[160px] h-8 text-xs bg-neutral-100 dark:bg-neutral-800/50 border-none">
            <SelectValue placeholder="Position Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FTE">Full-time</SelectItem>
            <SelectItem value="Freelance">Freelance / Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <AnimatePresence mode="wait">
          {filteredWorks.map((work, index) => (
            <motion.div
              layout
              key={work.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
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
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                      {work.role} · {work.position}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-neutral-400 dark:text-neutral-500 shrink-0">
                  {work.year}
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
