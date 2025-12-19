"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

const projects = [
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

const socials = [
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

const otherLinks = [
  {
    label: "spendsmart.quest",
    url: "https://www.spendsmart.quest/",
  },
];

type FooterProps = React.ComponentProps<"footer">;

const footerLinkClass = cn([
  "hover:text-black dark:hover:text-white transition-colors",
]);

export function Footer(props: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-3xl px-6 py-20 text-sm text-neutral-500"
    >
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.02 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-medium text-white">Me</h3>
          <Link href="/about" className={footerLinkClass}>
            About
          </Link>
          <Link href="/projects" className={footerLinkClass}>
            Projects
          </Link>
          <Link href="/writing" className={footerLinkClass}>
            Writing
          </Link>
          <Link href="/contact" className={footerLinkClass}>
            Contact
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-medium text-white">Projects</h3>
          {projects.slice(0, 10).map((p, i) => {
            return (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className={footerLinkClass}
              >
                {p.label}
              </a>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-medium text-white">Other</h3>
          {otherLinks.map((l, i) => {
            return (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className={footerLinkClass}
              >
                {l.label}
              </a>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-medium text-white">Socials</h3>
          {socials.map((s, i) => {
            return (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className={footerLinkClass}
              >
                {s.platform}
              </a>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
        className="mt-20 flex flex-col gap-4 sm:flex-row sm:justify-between"
      >
        <p>© 2025 Ram Shankar</p>
        <a
          href="https://bio.ram.codes/resume"
          target="_blank"
          rel="noreferrer"
          className={footerLinkClass}
        >
          Resume
        </a>
      </motion.div>
    </motion.footer>
  );
}
