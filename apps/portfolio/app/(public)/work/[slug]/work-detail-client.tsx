"use client";

import { Icon } from "@iconify-icon/react";
import { ImageDithering } from "@paper-design/shaders-react";
import { icons, type Work } from "@workspace/data";
import { Badge } from "@workspace/ui/components/badge";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type WorkDetailClientProps = {
  work: Work;
};

export function WorkDetailClient({ work }: WorkDetailClientProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-12 md:pt-32">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <span>{work.year}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
          <span>{work.position}</span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6"
          style={{
            viewTransitionName: `work-title-${work.slug}`,
          }}
        >
          {work.company}
        </h1>
        <p className="text-xl md:text-2xl font-medium text-neutral-500 dark:text-neutral-500">
          {work.role}
        </p>
      </motion.header>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="relative aspect-video mx-auto rounded-sm bg-neutral-800 dark:bg-transparent overflow-hidden mb-8 dark:border dark:border-dashed"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-1/2 h-1/2"
            style={
              {
                viewTransitionName: `work-image-${work.slug}`,
              } as React.CSSProperties
            }
          >
            {!isHovered ? (
              <Image
                src={work.image}
                alt={work.company}
                priority
                fill
                className="object-cover"
              />
            ) : (
              <ImageDithering
                image={work.image}
                colorBack="#0a0a0a"
                colorFront="#94ffaf"
                colorHighlight="#eaff94"
                originalColors={false}
                type="8x8"
                size={2}
                colorSteps={2}
                fit="cover"
                className="absolute inset-0"
              />
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-8">
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col gap-8"
        >
          {work.tags.length > 0 && (
            <div>
              <h3 className="text-sm border-b border-neutral-200 dark:border-neutral-800 pb-2 font-semibold text-neutral-900 dark:text-neutral-100 mb-4 uppercase tracking-wider">
                Industry & Domain
              </h3>
              <ul className="flex flex-col gap-2">
                {work.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-[15px] text-neutral-600 dark:text-neutral-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-sm border-b border-neutral-200 dark:border-neutral-800 pb-2 font-semibold text-neutral-900 dark:text-neutral-100 mb-4 uppercase tracking-wider">
              Links
            </h3>
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[15px] font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              Visit Platform
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </div>
        </motion.aside>
        <div className="flex flex-col gap-12">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Overview
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>{work.description}</p>
            </div>
          </motion.section>
          {work.keyDetails && work.keyDetails.filter(Boolean).length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                Impact & Work Delivered
              </h2>
              <ul className="space-y-4">
                {work.keyDetails.filter(Boolean).map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
                  >
                    <div className="shrink-0 mt-2 flex items-center justify-center size-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium text-[11px]">
                      {idx + 1}
                    </div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {work.technologies.map((tech) => {
                const icon = icons[tech as keyof typeof icons];
                return (
                  <Badge variant="secondary">
                    {icon && (
                      <Icon
                        icon={icon.actual ?? icon.simple}
                        width={18}
                        height={18}
                      />
                    )}
                    <span className="text-sm capitalize">
                      {tech.replace(/-/g, " ")}
                    </span>
                  </Badge>
                );
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </article>
  );
}
