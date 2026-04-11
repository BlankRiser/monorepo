import { Email, Github, Linkedin } from "@/src/components/icons";
import { Icon } from "@iconify-icon/react";
import type { JSX } from "react";
import type { ResumeData } from "./data";

export const ResumeHeader = ({
  header,
  skills,
}: {
  header: typeof ResumeData.header;
  skills: typeof ResumeData.skills;
}) => {
  return (
    <header className="grid">
      <h1 className="text-(size:--font-size-fluid-2) font-bold font-p22">
        {header.name}
      </h1>
      <SocialLinks social={header.social} />
      <section className="mt-8 print:hidden flex flex-col gap-4">
        <ResumeSummary summary={header.summary} />
      </section>
    </header>
  );
};

const IconMapper: Record<string, JSX.Element> = {
  github: <Github />,
  linkedin: <Linkedin />,
  email: <Email />,
  // medium: <Medium />,
  // hashnode: <Hashnode />,
  // leetcode: <Leetcode />,
  // hackerrank: <Hackerrank />,
};

const SocialLinks = ({
  social,
}: {
  social: typeof ResumeData.header.social;
}) => {
  return (
    <section className="flex flex-wrap gap-2">
      {Object.entries(social).map(([key, { label, url }]) => {
        return (
          <div
            key={label}
            className="group flex gap-1 items-center justify-center text-sm [&>svg]:group-hover:text-primary "
          >
            {IconMapper[key]}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              title={label}
              className="text-gray-600 hover:text-primary dark:text-gray-400 transition text-nowrap"
            >
              {label}
            </a>
          </div>
        );
      })}
    </section>
  );
};

const ResumeSummary = ({ summary }: { summary: string }) => {
  return <p className="border-l-4 border-l-primary pl-4">{summary}</p>;
};

const Skills = ({ skills }: { skills: typeof ResumeData.skills }) => {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(skills).map(([key, value]) => {
        return (
          <div className="flex gap-2 flex-wrap">
            {key && <p className="capitalize">{key}:</p>}
            <p className="flex gap-2 items-center">
              {Object.entries(value).map(([skill, icon], index) => {
                return (
                  <div
                    key={index}
                    className="group flex items-center gap-0.5 cursor-pointer"
                  >
                    <Icon
                      icon={icon}
                      width="24"
                      height="24"
                      className="text-gray-700"
                    />
                    <span className="hidden group-hover:inline text-nowrap transition duration-150 ease-in-out">
                      {skill}
                    </span>
                  </div>
                );
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};
