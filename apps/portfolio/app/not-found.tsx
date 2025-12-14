"use client";

import { FloatingNumber } from "@/components/common/floating-number";
import { Button } from "@workspace/ui/components/button";
import { motion } from "motion/react";
import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/writings", label: "Writings" },
];

function NotFoundPage() {
  return (
    <section className="grid min-h-dvh w-full place-items-center px-4">
      <motion.div
        className="flex flex-col items-center justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <h1 className="bg-linear-to-r from-foreground via-foreground/70 to-foreground bg-clip-text text-[10rem] font-bold leading-none tracking-tighter sm:text-[14rem]">
            <FloatingNumber delay={0}>4</FloatingNumber>
            <FloatingNumber delay={0.15}>0</FloatingNumber>
            <FloatingNumber delay={0.3}>4</FloatingNumber>
          </h1>
        </div>
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-lg font-medium text-foreground/80">
            Page not found
          </p>
          <p className="max-w-md text-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </motion.div>

        <motion.nav
          className="flex flex-wrap items-center justify-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {navigationLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Button asChild variant={"ghost"} size="sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  );
}

export default NotFoundPage;
