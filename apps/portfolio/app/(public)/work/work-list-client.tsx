"use client";

import { works } from "@workspace/data";
import { ICONMAP } from "@/components/common/tech-icon-map";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function WorkListClient() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-8 md:pt-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          All Work
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          A more detailed look at my past projects, freelance work, and
          full-time roles over the years.
        </p>
      </motion.div>

      <div className="flex flex-col gap-12 sm:gap-16">
        {works.map((work, index) => (
          <motion.div
            key={work.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            className="group relative flex flex-col gap-6"
          >
            <Link
              href={`/work/${work.slug}`}
              className="block relative w-full aspect-video md:aspect-21/9 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800/50 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors"
            >
              <div
                className=" rounded-t-xl overflow-hidden shadow-2xl transition-transform duration-500"
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
                  className="object-center object-contain"
                />
              </div>
            </Link>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <Link href={`/work/${work.slug}`}>
                  <h2
                    className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
                    style={
                      {
                        viewTransitionName: `work-title-${work.slug}`,
                      } as React.CSSProperties
                    }
                  >
                    {work.company}
                  </h2>
                </Link>
                <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="font-medium">{work.role}</span>
                  <span className="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span>{work.year}</span>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
                {work.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                {work.technologies.slice(0, 5).map((tech) => {
                  const icon = ICONMAP[tech as keyof typeof ICONMAP];
                  return (
                    <div
                      key={tech}
                      className={cn([
                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md",
                        "bg-neutral-100 dark:bg-neutral-800/60",
                        "text-neutral-600 dark:text-neutral-400",
                        "text-xs font-medium capitalize",
                      ])}
                    >
                      {icon && (
                        <span className="[&>svg]:size-3.5 [&>svg]:text-neutral-700 [&>svg]:dark:text-neutral-300">
                          {icon}
                        </span>
                      )}
                      <span>{tech.replace(/-/g, " ")}</span>
                    </div>
                  );
                })}
                {work.technologies.length > 5 && (
                  <span className="text-xs text-neutral-500 font-medium px-2 py-1">
                    +{work.technologies.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
