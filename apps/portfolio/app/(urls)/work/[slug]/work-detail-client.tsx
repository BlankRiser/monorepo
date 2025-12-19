"use client";

import { type Work } from "@/data/work";
import { ICONMAP } from "@/components/common/tech-icon-map";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

type WorkDetailClientProps = {
  work: Work;
};

export function WorkDetailClient({ work }: WorkDetailClientProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-8 md:pt-24">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Link
          href="/"
          className={cn([
            "inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900",
            "dark:text-neutral-400 dark:hover:text-neutral-100",
            "transition-colors duration-200 mb-8",
          ])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="relative aspect-video mx-auto overflow-hidden rounded-xl mb-8 bg-neutral-800"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-1/2 h-1/2">
            <Image
              src={work.image}
              alt={work.company}
              priority
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {work.company}
          </h1>
          <span className="text-sm text-neutral-400 dark:text-neutral-500">
            {work.year}
          </span>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">
          {work.role} · {work.position}
        </p>
      </motion.div>

      {work.tags.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {work.tags.map((tag) => (
            <li
              key={tag}
              className={cn([
                "px-3 py-1 text-xs rounded-full",
                "bg-neutral-100 text-neutral-600",
                "dark:bg-neutral-800 dark:text-neutral-400",
              ])}
            >
              {tag}
            </li>
          ))}
        </motion.ul>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
          About
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {work.description}
        </p>
      </motion.div>

      {/* Key Details / Accomplishments */}
      {work.keyDetails && work.keyDetails.filter(Boolean).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          className="mb-10"
        >
          <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
            Key Responsibilities
          </h2>
          <ul className="space-y-2">
            {work.keyDetails.filter(Boolean).map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
              >
                <span className="shrink-0 mt-2 size-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-3">
          {work.technologies.map((tech) => {
            const icon = ICONMAP[tech as keyof typeof ICONMAP];
            return (
              <div
                key={tech}
                className={cn([
                  "flex items-center gap-2 px-3 py-2 rounded-lg",
                  "bg-neutral-100 dark:bg-neutral-800",
                  "text-neutral-600 dark:text-neutral-400",
                ])}
                title={tech}
              >
                {icon && (
                  <span className="[&>svg]:size-5 [&>svg]:text-neutral-800 [&>svg]:dark:text-neutral-200">
                    {icon}
                  </span>
                )}
                <span className="text-sm capitalize">
                  {tech.replace(/-/g, " ")}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
      >
        <a
          href={work.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn([
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-neutral-900 text-white hover:bg-neutral-800",
            "dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
            "transition-colors duration-200",
          ])}
        >
          Visit Website
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
