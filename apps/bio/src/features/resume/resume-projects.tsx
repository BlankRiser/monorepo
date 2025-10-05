import {
  ExternalLink,
  Github,
  GlobeDualTone,
  Jsr,
  Npm,
} from "@/src/components/icons";
import type { ResumeData } from "./data";

export const ResumeProjects = ({
  data,
}: {
  data: (typeof ResumeData)["projects"];
}) => {
  return (
    <section className="grid gap-6">
      <h2 className="text-[size:var(--font-size-fluid-1)] font-p22 font-semibold border-b-1 border-blue-500">
        Projects
      </h2>
      <dl className="grid gap-4 text-sm">
        {data.map((project, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[var(--cols-1-auto)] [&_>_dd]:even:place-self-end "
            >
              <h3 className="text-[size:var(--font-size-fluid-0)] font-semibold flex items-center gap-1">
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.name}
                </a>
              </h3>
              <p className="text">
                {project.startDate} - {project.endDate}
              </p>
              <p className="text-zinc-600">{project.description}</p>
              <div className="flex gap-2 justify-end">
                {project.links.jsr && (
                  <a href={project.links.jsr} target="_blank" rel="noreferrer">
                    <Jsr className="size-5 h-[1lh]" />
                  </a>
                )}
                {project.links.npm && (
                  <a href={project.links.npm} target="_blank" rel="noreferrer">
                    <Npm className="h-[1lh]" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-[1lh]" />
                  </a>
                )}
                {project.links.website && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GlobeDualTone className="h-[1lh]" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
};
