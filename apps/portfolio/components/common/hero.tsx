"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { buttonVariants } from "@workspace/ui/components/button";
import { GithubIcon } from "@workspace/ui/icons/github-icon";
import { LinkedinIcon } from "@workspace/ui/icons/linkedin-icon";
import { MailIcon } from "@workspace/ui/icons/mail-icon";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroProps = HTMLMotionProps<"section">;

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/blankriser",
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ram-shankar-choudhary",
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:ramshankarcodes@gmail.com",
    icon: MailIcon,
    external: false,
  },
];

export const Hero = (props: HeroProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const transitionConfig = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionConfig}
      {...props}
      className={cn("flex flex-col gap-6 md:gap-7", props.className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="relative inline-flex items-center justify-center rounded-2xl border border-neutral-200/80 bg-neutral-100/70 p-1.5 shadow-2xs backdrop-blur-xs transition-transform duration-200 hover:scale-[1.02] dark:border-neutral-800/80 dark:bg-neutral-900/60"
          title="DevHaven Insignia (Interactive shader)"
        >
          {mounted ? (
            <LiquidMetal
              width={92}
              height={92}
              image="/devhaven-logo.svg"
              colorBack={isDark ? "#0a0a0a" : "#fafafa"}
              colorTint={isDark ? "#ffffff" : "#0a0a0a"}
              shape="daisy"
              repetition={2}
              softness={0.1}
              shiftRed={0.1}
              shiftBlue={0.1}
              distortion={0.07}
              contour={0.4}
              angle={70}
              speed={0.75}
              scale={0.6}
              fit="contain"
              className="rounded-xl"
            />
          ) : (
            <div className="flex h-[92px] w-[92px] items-center justify-center rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30">
              <span className="sr-only">DevHaven emblem loading</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-1 sm:items-end">
          <span className="rounded-md border border-neutral-200/80 bg-neutral-100/70 px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-300">
            Available for contracts and consulting
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Bengaluru, India (UTC+5:30)
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-neutral-50">
          Ram Shankar Choudhary
        </h1>

        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <span
            className="inline-flex items-center rounded-md border border-neutral-200/70 bg-neutral-100/80 px-2.5 py-0.5 font-mono text-xs text-neutral-600 select-all dark:border-neutral-800/70 dark:bg-neutral-900/80 dark:text-neutral-400"
            lang="in"
            data-ssml-sub-alias="Ram Shankar Choudhary"
            title="IPA phonetic transcription"
          >
            {"/\u0072\u00E6\u006D \u0283\u00E6\u006E\u006B\u00E6\u0072 \u0074\u0283\u0252\u028C\u0064\u0068\u00E6\u0072\u0079/"}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Full-stack engineer and systems designer
          </span>
        </div>
      </div>

      <p className="max-w-2xl text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300">
        Building high-performance web products, developer tooling, and
        resilient systems across the JavaScript and cloud ecosystem.
      </p>

      <div className="flex flex-wrap justify-between items-center gap-3 pt-1">
        <div className="flex flex-wrap gap-3">
          <a href="mailto:ramshankarcodes@gmail.com" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'w-full sm:w-auto' })}>
            Get in Touch
          </a>
        <Link
          href="/work"
          className={buttonVariants({
            variant: 'ghost',
            size: 'lg',
            className: 'w-full sm:w-auto'
          })}
        >
          View Selected Work
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        </div>

        <div className="flex items-center gap-1.5 pl-1 sm:pl-2">
          {socialLinks.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                title={s.label}
                className={buttonVariants({ variant: 'outline', size: 'icon' })}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{s.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
