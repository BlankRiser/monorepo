"use client";

import { PixelCityscape } from "@/components/common/pixel-cityscape";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowUp } from "lucide-react";
import { type HTMLMotionProps, motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";

export const projects = [
  {
    label: "Mausam",
    url: "https://mausam.ram.codes/",
    github: "https://github.com/BlankRiser/mausam",
  },
  {
    label: "Unit Conversion SDK",
    url: "https://www.npmjs.com/package/@devhaven/unit-conversion",
    github: "https://github.com/BlankRiser/unit-conversion",
  },
  {
    label: "Synoptic SDK",
    url: "https://www.npmjs.com/package/@devhaven/synoptic-sdk",
    github: "https://github.com/BlankRiser/synoptic-sdk",
  },
  {
    label: "Games",
    url: "https://games.ram.codes/",
    github: "https://github.com/BlankRiser/devhaven-games",
  },
  {
    label: "UI",
    url: "https://ui.ram.codes",
    github: "https://github.com/BlankRiser/ui.ram.codes",
  },
  {
    label: "Devhaven Theme",
    url: "https://marketplace.visualstudio.com/items?itemName=DevHaven.devhaven",
    github: "https://github.com/BlankRiser/DevHaven",
  },
];

export const socials = [
  {
    platform: "Linkedin",
    username: "ram-shankar-choudhary",
    link: "https://www.linkedin.com/in/ram-shankar-choudhary/",
  },
  {
    platform: "GitHub",
    username: "@BlankRiser",
    link: "https://github.com/blankriser",
  },
  {
    platform: "X (Twitter)",
    username: "@Blank_Riser",
    link: "https://x.com/Blank_Riser",
  },
  {
    platform: "Bluesky",
    username: "@otheos.bsky.social",
    link: "https://bsky.app/profile/otheos.bsky.social",
  },
];

export const otherLinks = [
  {
    label: "spendsmart.quest",
    url: "https://www.spendsmart.quest/",
  },
];

type FooterProps = HTMLMotionProps<"footer">;

const footerLinkClass = cn(
  "text-sm text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xs dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600",
);

export function Footer(props: FooterProps) {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0 },
    show: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.05,
            delayChildren: 0.05,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={cn(
        "mx-auto max-w-3xl px-6 pt-16 pb-12 text-sm text-neutral-500",
        props.className,
      )}
      {...props}
    >
      {/* Directory Grid */}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
        {/* Navigation */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Index
          </h3>
          <Link href="/about" className={footerLinkClass}>
            About
          </Link>
          <Link href="/work" className={footerLinkClass}>
            Work
          </Link>
          <Link href="/writing" className={footerLinkClass}>
            Writing
          </Link>
          <Link href="/contact" className={footerLinkClass}>
            Contact
          </Link>
          <a
            href="https://bio.ram.codes/resume"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            Resume
          </a>
        </motion.div>

        {/* Selected Projects */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Projects
          </h3>
          {projects.map((p) => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              {p.label}
            </a>
          ))}
        </motion.div>

        {/* Products and Ecosystem */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Products
          </h3>
          {otherLinks.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/BlankRiser"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            All Repositories
          </a>
          <a
            href="https://www.npmjs.com/~devhaven"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            npm Packages
          </a>
        </motion.div>

        {/* Connect & Channels */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Connect
          </h3>
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              {s.platform}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Skyline Horizon */}
      <motion.div variants={itemVariants} className="mt-14">
        <PixelCityscape />
      </motion.div>

      {/* Colophon & Bottom Bar */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-neutral-200/70 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center dark:border-neutral-800/70 dark:text-neutral-400"
      >
        <p>© {currentYear} Ram Shankar Choudhary. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <span>Bengaluru, India (UTC+5:30)</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex cursor-pointer items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xs dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600"
            aria-label="Scroll back to top"
          >
            Top
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </motion.footer>
  );
}
