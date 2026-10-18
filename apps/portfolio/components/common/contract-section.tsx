"use client";

import { works } from "@workspace/data";
import { motion } from "motion/react";
import { WorkItem } from "./work-item";

const contractWorks = works.filter(
  (work) => work.position === "Freelance" || work.position === "Contract",
);

export const ContractSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="flex flex-col gap-6"
    >
      <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Contract Work
      </h2>
      <div className="flex flex-col gap-1">
        {contractWorks.map((work, index) => (
          <WorkItem
            key={work.slug}
            work={work}
            index={index}
            subtitle={work.brief ?? work.description}
          />
        ))}
      </div>
    </motion.section>
  );
};
