"use client";

import { cn } from "@workspace/ui/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

export const Manifesto = (props: HTMLMotionProps<"section">) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: 0.25,
      }}
      className={cn([
        "flex flex-col items-center justify-center gap-4 text-neutral-700 dark:text-neutral-300",
        props.className,
      ])}
      {...props}
    >
      <p>
        I am a Full Stack Developer with a passion for building digital products
        that solve real-world problems. My journey in tech is driven by a
        curiosity to understand how things work and a desire to create
        meaningful experiences.
      </p>
      <p>
        I specialize in the JavaScript ecosystem, leveraging tools like React,
        Next.js, Node.js, and TypeScript to build robust and scalable
        applications. I believe in clean code, user-centric design, and
        continuous learning.
      </p>
      <p>
        Why do I do this? Because I love the process of turning ideas into
        reality. Whether it's a simple website or a complex web application,
        there's a unique satisfaction in crafting something that others can use
        and enjoy.
      </p>
    </motion.section>
  );
};
