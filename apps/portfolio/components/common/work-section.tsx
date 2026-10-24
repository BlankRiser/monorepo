"use client";

import { works } from "@workspace/data";
import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { WorkItem } from "./work-item";

const fullTimeWorks = works.filter((work) => work.position === "FTE");

type WorkSectionProps = HTMLMotionProps<"section">;

export const WorkSection = (props: WorkSectionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }
      }
      {...props}
      className={props.className}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          Work Experience
        </h2>

        <div className="flex flex-col gap-0.5">
          {fullTimeWorks.map((work, index) => (
            <WorkItem key={work.slug} work={work} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
