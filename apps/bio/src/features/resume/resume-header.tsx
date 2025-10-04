import { Email, Github, Linkedin } from "@/src/components/icons";
import type { JSX } from "react";
import type { ResumeData } from "./data";

export const ResumeHeader = ({
  header,
}: {
  header: typeof ResumeData.header;
}) => {
  return (
    <header className="grid">
      <h1 className="text-[size:var(--font-size-fluid-2)] font-bold font-p22">
        {header.name}
      </h1>
      <SocialLinks social={header.social} />
      <section className="mt-8">
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
            className="group flex gap-1 items-center justify-center text-sm [&>svg]:group-hover:text-blue-500 "
          >
            {IconMapper[key]}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              title={label}
              className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition text-nowrap"
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
  return <p className="border-l-4 border-l-blue-500 pl-4">{summary}</p>;
};
