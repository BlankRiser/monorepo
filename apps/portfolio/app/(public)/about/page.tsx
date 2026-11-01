import { projects, works } from "@workspace/data";
import { buttonVariants } from "@workspace/ui/components/button";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Ram Shankar Choudhary got here, what he works on, and what he values in software.",
};

const recentRole = works.find((work) => work.slug === "synoptic");
const freelanceWork = works.find((work) => work.slug === "konnect");
const featuredProject = projects.find((project) => project.label === "Mausam");

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-12 md:pt-20">
      <header className="max-w-3xl">
        <p className="mb-5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          A little about how I work
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-neutral-50">
          I make complex software feel clear, useful, and dependable.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-300">
          I’m Ram, a Bengaluru-based software engineer working across product
          engineering, interface design, and the systems behind them. I like
          getting close to the problem, then staying involved through the
          details that make a product work in the real world.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            Get in touch
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/work"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Browse selected work
          </Link>
        </div>
      </header>

      <section className="mt-24 grid gap-8 border-t border-neutral-200 pt-8 md:grid-cols-[minmax(150px,0.7fr)_1.3fr] md:gap-16 dark:border-neutral-800">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            01 / The path so far
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
            How I got here
          </h2>
        </div>
        <div className="space-y-5 text-[15px] leading-7 text-neutral-600 dark:text-neutral-300">
          <p>
            An early engineering project with ICTS brought me into science
            communication, where I helped build an online exhibition alongside
            scientists and designers. After graduating in computer science, I
            joined Nabler and worked close to the data, building reporting
            workflows and learning how much good software depends on reliable
            foundations.
          </p>
          <p>
            From there I moved deeper into product engineering: financial
            platforms and design systems, weather data tools, digital adoption
            software, and education products. Each step widened the part of the
            product I could take responsibility for, from shaping the interface
            to working through data, architecture, and delivery.
          </p>
          <p>
            Today I work across frontend and full stack engineering. I care
            about making complicated workflows understandable, keeping systems
            maintainable, and working closely with the people who use and shape
            the product.
          </p>
        </div>
      </section>

      <section className="mt-24 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              02 / A few things I've worked on
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Recent work
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-950 dark:text-neutral-300 dark:decoration-neutral-700 dark:hover:text-neutral-50"
          >
            All work <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {recentRole && (
            <FeaturedEntry
              index="A"
              eyebrow="Recent role · 2025–present"
              title={`${recentRole.role} at ${recentRole.company}`}
              description={recentRole.brief ?? recentRole.description}
              href={`/work/${recentRole.slug}`}
              linkLabel="Role details"
            />
          )}
          {freelanceWork && (
            <FeaturedEntry
              index="B"
              eyebrow="Freelance · 2025–2026"
              title={`${freelanceWork.role} at ${freelanceWork.company}`}
              description={freelanceWork.brief ?? freelanceWork.description}
              href={`/work/${freelanceWork.slug}`}
              linkLabel="Freelance case study"
            />
          )}
          {featuredProject && (
            <FeaturedEntry
              index="C"
              eyebrow="Independent project"
              title={featuredProject.label}
              description="A weather application built around clear, useful access to meteorological data."
              href={featuredProject.url}
              linkLabel="Visit project"
              external
            />
          )}
        </div>
      </section>

      <section className="mt-24 grid gap-8 border-t border-neutral-200 pt-8 md:grid-cols-[minmax(150px,0.7fr)_1.3fr] md:gap-16 dark:border-neutral-800">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            03 / What matters to me
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
            Where I stand
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-[15px] leading-7 text-neutral-600 dark:text-neutral-300">
            I believe good software should make hard things easier to understand
            and easier to change. I value thoughtful interfaces, sound technical
            foundations, and teams that share context openly. I’m happiest when
            I can follow a problem from the first conversation through a release
            people can rely on.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="https://bio.ram.codes/resume"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View my resume
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
              <MapPin className="size-4" aria-hidden="true" />
              Bengaluru, India
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}

function FeaturedEntry({
  index,
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  external = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div className="flex items-start gap-4 sm:gap-7">
        <span className="pt-1 font-mono text-xs text-emerald-700 dark:text-emerald-300">
          {index}
        </span>
        <div className="max-w-2xl">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-lg font-medium tracking-tight text-neutral-950 dark:text-neutral-50">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            {description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 group-hover:text-neutral-950 dark:text-neutral-300 dark:decoration-neutral-700 dark:group-hover:text-neutral-50">
            {linkLabel}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
      <ArrowUpRight
        className="mt-1 size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 dark:text-neutral-500"
        aria-hidden="true"
      />
    </>
  );

  const className =
    "group flex items-start justify-between gap-4 py-6 first:pt-0 last:pb-0";

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
