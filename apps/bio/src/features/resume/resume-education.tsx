import { Badge } from "@workspace/ui/components/badge";
import type { ResumeData } from "./data";

export const ResumeEducation = ({
  data,
}: {
  data: (typeof ResumeData)["education"];
}) => {
  return (
    <section className="grid gap-6">
      <h2 className="text-(size:--font-size-fluid-1) font-p22 font-semibold border-b border-primary">
        Education
      </h2>
      <dl className="grid gap-4 text-sm">
        {data.map((edu, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-(--cols-1-auto) [&_>_dd]:even:place-self-end "
            >
              <dt className="text-(size:--font-size-fluid-0) font-semibold">
                {edu.institution}
              </dt>
              <dd className="text">
                {edu.startDate} - {edu.endDate}
              </dd>
              <dd className="flex gap-1">
                <Badge asChild variant={"outline"}>
                  <b className="text-xs">{edu.degree.type}</b>
                </Badge>
                {edu.degree.field}
              </dd>
              <dd>{edu.location}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};
