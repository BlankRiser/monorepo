"use client";

import { motion } from "motion/react";

type HeroProps = React.ComponentProps<"section">;

export const Hero = (props: HeroProps) => {
  return (
    <section {...props}>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-4 text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl"
      >
        Ram Shankar Choudhary
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col gap-1 text-lg text-neutral-600 dark:text-neutral-400 sm:flex-row sm:items-center sm:gap-4"
      >
        <span>Full Stack Developer</span>
        <span className="hidden text-neutral-700 sm:inline">•</span>
        <span>Based in India</span>
      </motion.div>
    </section>
  );
};
