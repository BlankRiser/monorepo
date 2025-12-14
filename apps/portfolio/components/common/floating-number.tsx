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
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: [0, -8, 0],
        opacity: 1,
      }}
      transition={{
        y: {
          delay: delay + 0.5,
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: { delay, duration: 0.4 },
      }}
    >
      {children}
    </motion.span>
  );
}
