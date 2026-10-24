import { Hero } from "@/components/common/hero";
import { Manifesto } from "@/components/common/manifesto";
import { ServicesSection } from "@/components/common/services-section";
import { WorkSection } from "@/components/common/work-section";
import { ContractSection } from "@/components/common/contract-section";
import { ProjectsSection } from "@/components/common/projects-section";
import { ProcessSection } from "@/components/common/process-section";
import { FaqSection } from "@/components/common/faq-section";
import { CtaSection } from "@/components/common/cta-section";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-8 md:pt-32 space-y-16">
      <Hero />
      <Manifesto />
      <ServicesSection />
      <WorkSection />
      <ContractSection />
      <ProjectsSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
