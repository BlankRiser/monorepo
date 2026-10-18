"use client";

import { FloatingNumber } from "@/components/common/floating-number";
import { Navbar } from "@/components/common/navbar";
import { PixelSpaceship } from "@/components/common/pixel-spaceship";
import { Button } from "@workspace/ui/components/button";
import { motion } from "motion/react";
import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-dvh w-full flex-col items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          className="flex flex-col items-center justify-center gap-6 text-center max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PixelSpaceship />

          <div className="relative">
            <h1 className="font-mono text-8xl font-bold tracking-tighter text-neutral-900 dark:text-neutral-100 sm:text-9xl select-none">
              <FloatingNumber delay={0}>4</FloatingNumber>
              <FloatingNumber delay={0.2}>0</FloatingNumber>
              <FloatingNumber delay={0.4}>4</FloatingNumber>
            </h1>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
              Lost in deep space
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              The coordinates you are looking for do not exist or have drifted out of orbit.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="default" className="rounded-full px-5">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="default" className="rounded-full px-5">
              <Link href="/work">Explore Work</Link>
            </Button>
          </div>

          <nav
            aria-label="Direct links"
            className="flex flex-wrap items-center justify-center gap-1.5 pt-4 text-xs text-neutral-400 dark:text-neutral-500"
          >
            <span>Or jump to:</span>
            {navigationLinks.map((link, index) => (
              <span key={link.href} className="inline-flex items-center gap-1.5">
                <Link
                  href={link.href}
                  className="hover:text-neutral-900 dark:hover:text-neutral-200 underline-offset-4 hover:underline transition-colors"
                >
                  {link.label}
                </Link>
                {index < navigationLinks.length - 1 && <span>·</span>}
              </span>
            ))}
          </nav>
        </motion.div>
      </main>
    </>
  );
}
