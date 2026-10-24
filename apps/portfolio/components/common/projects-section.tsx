"use client";

import { projects } from "@workspace/data";
import { GithubIcon } from "@workspace/ui/icons/github-icon";
import { NpmIcon } from "@workspace/ui/icons/npm-icon";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";

type ProjectsSectionProps = HTMLMotionProps<"section">;

export const ProjectsSection = (props: ProjectsSectionProps) => {
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
          Projects
        </h2>

        <div className="flex flex-col gap-0.5">
          {projects.map((project, index) => {
            const npmUrl =
              project.npm ??
              (project.url.includes("npmjs.com") ? project.url : undefined);

            return (
              <motion.div
                key={project.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1] as const,
                        delay: index * 0.03,
                      }
                }
                className={cn(
                  "group flex items-center justify-between gap-4 rounded-lg p-2.5 -mx-2.5 transition-colors duration-150",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-900/60",
                )}
              >
                {/* Main project link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-0.5 min-w-0 flex-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100 truncate">
                      {project.label}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-neutral-400 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 dark:text-neutral-500"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {project.description}
                  </p>
                </a>

                {/* External repository & package actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {npmUrl ? (
                    <a
                      href={npmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200/60 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600"
                      aria-label={`View ${project.label} package on npm`}
                      title="npm package"
                    >
                      <NpmIcon className="size-4" />
                    </a>
                  ) : null}

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200/60 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600"
                      aria-label={`View ${project.label} on GitHub`}
                      title="GitHub repository"
                    >
                      <GithubIcon className="size-4" />
                    </a>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
