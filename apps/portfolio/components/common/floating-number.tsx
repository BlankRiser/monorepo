"use client";

import { motion } from "motion/react";

export function FloatingNumber({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.span
      className="inline-block font-mono"
      animate={{
        y: [-4, 4, -4],
      }}
      transition={{
        duration: 3.6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.span>
  );
}
