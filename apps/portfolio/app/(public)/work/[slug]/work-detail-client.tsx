"use client";

/* Hallmark · work-detail-client · Case Study Dossier */

import { Icon } from "@iconify-icon/react";
import { ImageDithering } from "@paper-design/shaders-react";
import { icons, works, type Work } from "@workspace/data";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, ExternalLink, Layers, Sparkles, } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type WorkDetailClientProps = {
  work: Work;
};

export function WorkDetailClient({ work }: WorkDetailClientProps) {
  const [ditherActive, setDitherActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Find next and previous projects for the case study footer
  const { prevWork, nextWork } = useMemo(() => {
    const currentIndex = works.findIndex((w) => w.slug === work.slug);
    const prev = works[(currentIndex - 1 + works.length) % works.length];
    const next = works[(currentIndex + 1) % works.length];
    return { prevWork: prev, nextWork: next };
  }, [work.slug]);

  const cleanKeyDetails = useMemo(() => {
    if (!work.keyDetails) return [];
    return work.keyDetails.filter((d) => Boolean(d && d.trim()));
  }, [work.keyDetails]);

  const positionLabel =
    work.position === "FTE"
      ? "Full-Time Engineering"
      : work.position === "Freelance"
        ? "Freelance Engagement"
        : "Contract Development";

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-8 md:pt-16 space-y-12">
      {/* Top Navigation Bar: Return to Portfolio & External Link */}
      <motion.nav
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-between gap-4 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-4 text-xs font-mono"
        aria-label="Breadcrumb navigation"
      >
        <Link
          href="/"
          className={cn([
            "inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
            "transition-colors duration-150 rounded px-1 -mx-1 py-0.5",
            "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
          ])}
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          <span>Back to portfolio</span>
        </Link>

        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn([
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium",
              "border border-neutral-300/80 dark:border-neutral-700/80 bg-neutral-100/60 dark:bg-neutral-900/60",
              "text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600",
              "transition-colors duration-150 shadow-2xs",
              "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
            ])}
          >
            <span>Visit platform</span>
            <ArrowUpRight className="size-3.5 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
          </a>
        )}
      </motion.nav>

      {/* Case Study Header */}
      <motion.header
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span>{work.year}</span>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span>{positionLabel}</span>
          {work.tags && work.tags.length > 0 && (
            <>
              <span className="text-neutral-300 dark:text-neutral-700">/</span>
              <span>{work.tags[0]}</span>
            </>
          )}
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 text-balance"
          style={{
            viewTransitionName: `work-title-${work.slug}`,
          }}
        >
          {work.company}
        </h1>

        <p className="text-lg sm:text-xl font-medium text-neutral-600 dark:text-neutral-400">
          {work.role}
        </p>

        {work.brief && (
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 text-pretty leading-relaxed pt-1">
            {work.brief}
          </p>
        )}
      </motion.header>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="group relative aspect-video mx-auto rounded-2xl bg-[#0a0a0a] dark:bg-transparent overflow-hidden mb-8 dark:border dark:border-dashed"
        onMouseEnter={() => setDitherActive(true)}
        onMouseLeave={() => setDitherActive(false)}
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
            {!ditherActive ? (
              <Image
                src={work.image}
                alt={`${work.company} platform screenshot`}
                priority
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 384px"
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
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-neutral-300 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <Sparkles className="size-3 text-[#94ffaf]" aria-hidden="true" />
          <span>{ditherActive ? "Dither Art" : "Hover to Dither"}</span>
        </div>
      </motion.div>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-neutral-200/70 dark:border-neutral-800/70 text-xs"
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-neutral-400 dark:text-neutral-500 text-[11px]">
            Timeline
          </span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {work.year}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-neutral-400 dark:text-neutral-500 text-[11px]">
            Engagement
          </span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {work.position}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-neutral-400 dark:text-neutral-500 text-[11px]">
            Role
          </span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
            {work.role}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-neutral-400 dark:text-neutral-500 text-[11px]">
            Deployment
          </span>
          {work.url ? (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline truncate inline-flex items-center gap-1"
            >
              <span>Live Site</span>
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-neutral-500">Internal System</span>
          )}
        </div>
      </motion.div>
      <div className="flex flex-col gap-10">
        <motion.section
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
            <Layers className="size-4" aria-hidden="true" />
            <h2 className="text-lg font-medium tracking-tight">Overview</h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
            {work.description}
          </p>
        </motion.section>
        {cleanKeyDetails.length > 0 && (
          <motion.section
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
              <Check className="size-4" aria-hidden="true" />
              <h2 className="text-lg font-medium tracking-tight">
                Work Delivered & Technical Scope
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {cleanKeyDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-100/40 dark:bg-neutral-900/30"
                >
                  <span className="p-0.5 rounded-full bg-[#94ffaf]/20 text-neutral-900 dark:text-[#94ffaf] shrink-0 mt-0.5">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
        {work.tags && work.tags.length > 0 && (
          <motion.section
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col gap-2.5"
          >
            <span className="font-mono text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
              Industry & Focus Domains
            </span>
            <div className="flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/40 text-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.section>
        )}
        <motion.section
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
            <Code2 className="size-4" aria-hidden="true" />
            <h2 className="text-lg font-medium tracking-tight">Tech Stack</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {work.technologies.map((tech, i) => {
              const icon = icons[tech as keyof typeof icons];
              return (
                <div
                  key={i}
                  className={cn([
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg",
                    "border border-neutral-200/80 dark:border-neutral-800/80",
                    "bg-neutral-100/50 dark:bg-neutral-900/40",
                    "text-xs font-mono text-neutral-800 dark:text-neutral-200",
                  ])}
                >
                  {icon && (
                    <Icon
                      icon={icon.actual ?? icon.simple}
                      width={15}
                      height={15}
                      className="shrink-0"
                    />
                  )}
                  <span>{tech.replace(/-/g, " ")}</span>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
      <motion.footer
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="pt-10 border-t border-neutral-200/70 dark:border-neutral-800/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
        aria-label="Other case studies"
      >
        {prevWork && (
          <Link
            href={`/work/${prevWork.slug}`}
            className={cn([
              "group flex flex-col gap-1 p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70",
              "bg-neutral-100/40 dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700",
              "transition-colors duration-150 flex-1 text-left",
              "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
            ])}
          >
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              <ArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
              <span>Previous project</span>
            </div>
            <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100 group-hover:underline">
              {prevWork.company}
            </span>
          </Link>
        )}
        {nextWork && (
          <Link
            href={`/work/${nextWork.slug}`}
            className={cn([
              "group flex flex-col gap-1 p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70",
              "bg-neutral-100/40 dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700",
              "transition-colors duration-150 flex-1 text-right sm:items-end",
              "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
            ])}
          >
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              <span>Next project</span>
              <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100 group-hover:underline">
              {nextWork.company}
            </span>
          </Link>
        )}
      </motion.footer>
    </article>
  );
}
