import { calculateTotalExperience, getDateDifference } from "@/src/lib/utils";
import type { ResumeData } from "./data";

export const ResumeExperience = ({
  data,
}: {
  data: (typeof ResumeData)["experience"];
}) => {
  const totalExperience = calculateTotalExperience(data);

  return (
    <section className="grid gap-6">
      <h2 className="text-(size:--font-size-fluid-1) font-p22 font-semibold border-b border-blue-500 w-full flex justify-between items-center">
        Experience
        <span className="font-medium text-sm h-lh align-middle bg-zinc-100 text-zinc-800 rounded-md px-2 ml-2">
          {totalExperience}
        </span>
      </h2>
      <dl className="grid gap-4 text-sm">
        {data.map((exp, index) => {
          const exprience =
            exp.company.experience.toLowerCase() === "present"
              ? getDateDifference(exp.company.startDate)
              : exp.company.experience;

          return (
            <article key={index}>
              <header className="grid grid-cols-(--cols-1-auto) [&_>_dd]:even:place-self-end">
                <h3 className="text-(size:--font-size-fluid-0) font-semibold flex items-center gap-1">
                  <a href={exp.company.url} target="_blank" rel="noreferrer">
                    {exp.company.name}
                  </a>
                </h3>
                <p className="text-right">
                  <time dateTime={exp.company.startDate}>
                    {exp.company.startDate}
                  </time>
                  {" - "}
                  <time dateTime={exp.company.endDate}>
                    {exp.company.endDate}
                  </time>
                </p>
                <p className="font-medium text-zinc-800">
                  {exp.role}{" "}
                  <span className="text-zinc-600 font-light">
                    ({exprience})
                  </span>
                </p>
                <p className="text-right">{exp.company.location}</p>
              </header>
              <ul className="list-disc [&_li]:ml-4 [&_li]:text-sm mt-2 space-y-1 text-zinc-600">
                {exp.responsibilities.map((item, idx) => {
                  return <li key={idx}>{item}</li>;
                })}
              </ul>
            </article>
          );
        })}
      </dl>
    </section>
  );
};
