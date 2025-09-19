import { AuroraBackground } from "@/src/components/ui/aurora-background";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="relative h-[calc(100dvh-3.5rem)] w-screen overflow-hidden bg-black/50">
        <AuroraBackground />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 pb-24 pt-36 sm:gap-8 sm:pt-44 md:px-10 lg:px-16 ">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-light tracking-tight text-white/80">
              Blog
            </span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span className="text-xs font-light tracking-tight text-white/80">
              Snippets
            </span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span className="text-xs font-light tracking-tight text-white/80">
              Life
            </span>
          </div>

          <h1 className="max-w-2xl text-left text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Ram Shankar's Blog
          </h1>

          <p className="max-w-xl text-left text-base font-light leading-relaxed tracking-tight text-white/75 sm:text-lg">
            Personal blog about tech, programming, and stuff I find interesting.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {[
              { text: "Explore my blog", href: "/blog", primary: true },
              { text: "Review my snippets", href: "/snippets" },
            ].map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className={`rounded-2xl border border-white/10 px-5 py-3 text-sm font-light tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 duration-300 ${
                  button.primary
                    ? "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                    : "text-white/80 hover:bg-white/5"
                }`}
              >
                {button.text}
              </Link>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-6 text-xs font-extralight tracking-tight text-white/60">
            {[
              "Typescript",
              "Python",
              "AWS",
              "React",
              "Software Engineering",
            ].map((detail, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/40" /> {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </section>
    </main>
  );
}
