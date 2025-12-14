"use client";

import { projects } from "@/data/projects";
import { GithubIcon } from "@workspace/ui/icons/github-icon";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

export const ProjectsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="flex flex-col gap-6"
    >
      <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Projects
      </h2>
      <div className="flex flex-col gap-1">
        {projects.map((project, index) => (
          <motion.div
            key={project.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.1 + index * 0.05,
            }}
            className={cn([
              "group flex items-center justify-between gap-4 py-3 px-3 -mx-3 rounded-lg",
              "transition-colors duration-200",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
            ])}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-0.5 min-w-0 flex-1"
            >
              <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {project.label}
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                {project.description}
              </span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn([
                "shrink-0 p-2 rounded-md",
                "text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
                "transition-colors duration-200",
              ])}
              aria-label={`View ${project.label} on GitHub`}
            >
              <GithubIcon className="size-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
