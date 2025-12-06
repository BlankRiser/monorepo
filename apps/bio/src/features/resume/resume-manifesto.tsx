import { Button } from "@workspace/ui/components/button";
import type { ResumeData } from "./data";

export const ResumeManifesto = ({
  data,
}: {
  data: (typeof ResumeData)["manifesto"];
}) => {
  return (
    <section className="grid gap-6">
      <h2 className="text-(size:--font-size-fluid-1) font-p22 font-semibold border-b border-blue-500">
        Background
      </h2>
      <article className="grid gap-4 text-sm">
        {data.map((m, index) => {
          return (
            <p key={index} className="grid grid-cols-(--cols-1-auto) ">
              {m}
            </p>
          );
        })}
      </article>
      <Button asChild className="print:hidden">
        <a href="/ram_resume.pdf" download="ram_resume.pdf">
          Save Resume
        </a>
      </Button>
    </section>
  );
};
