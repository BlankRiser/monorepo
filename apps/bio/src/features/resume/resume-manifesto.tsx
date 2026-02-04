import { Button } from "@workspace/ui/components/button";
import type { ResumeData } from "./data";

export const ResumeManifesto = ({
  data,
}: {
  data: (typeof ResumeData)["manifesto"];
}) => {
  return (
    <section className="grid gap-6">
      <h2 className="text-(size:--font-size-fluid-1) font-p22 font-semibold border-b border-primary">
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
      <div className="grid sm:grid-cols-2 gap-2 w-full">
        <Button asChild className="print:hidden">
          <a href="/assets/ram_2_column.pdf" download="ram_resume.pdf">
            Download Resume
          </a>
        </Button>
        <Button asChild variant="link" className="print:hidden">
          <a href="/ram_resume.pdf" download="ram_resume.pdf">
            Save this page as PDF
          </a>
        </Button>
      </div>
    </section>
  );
};
