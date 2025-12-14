import { Hero } from "@/components/common/hero";
import { Manifesto } from "@/components/common/manifesto";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-8 md:pt-32 space-y-8">
      <Hero />
      <Manifesto />
      <div className="h-[200vh]" />
    </div>
  );
}
