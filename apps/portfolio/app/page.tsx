import { Hero } from "@/components/common/hero";
import { Manifesto } from "@/components/common/manifesto";
import { WorkSection } from "@/components/common/work-section";
import { ProjectsSection } from "@/components/common/projects-section";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-8 md:pt-32 space-y-16">
      <Hero />
      <Manifesto />
      <WorkSection />
      <ProjectsSection />
    </div>
  );
}
