import type { ResumeData } from "./data";

export const ResumeExperience = ({
  data,
}: {
  data: (typeof ResumeData)["experience"];
}) => {
  return (
    <section className="grid gap-6">
      <h2 className="text-[size:var(--font-size-fluid-1)] font-p22 font-semibold border-b-1 border-blue-500">
        Experience
      </h2>
      <dl className="grid gap-4 text-sm">
        {data.map((exp, index) => {
          return (
            <article key={index}>
              <header className="grid grid-cols-[var(--cols-1-auto)] [&_>_dd]:even:place-self-end">
                <h3 className="text-[size:var(--font-size-fluid-0)] font-medium flex items-center gap-1">
                  <a href={exp.company.url} target="_blank" rel="noreferrer">
                    {exp.company.name}
                  </a>
                </h3>
                <p className="text-right">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p>{exp.role}</p>
                <p className="text-right">{exp.location}</p>
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
