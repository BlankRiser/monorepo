import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { getUsesSource } from "@/lib/source";
import { createOgMetadata } from "@/lib/og-metadata";

const description =
  "The tools, software, and technologies Ram Shankar reaches for when designing and building software.";

export const metadata: Metadata = {
  title: "Uses",
  description,
  ...createOgMetadata({
    title: "Uses",
    description,
    section: "Tools and workflow",
  }),
  alternates: {
    canonical: "https://ram.codes/uses",
  },
};

export default async function UsesPage() {
  const source = await getUsesSource();
  const page = source.getPages()[0];

  if (!page) notFound();

  const { render } = await page.data.load();
  const { body } = await render(getMDXComponents());

  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-12 md:pt-20">
      <header className="max-w-3xl border-b border-neutral-200 pb-10 dark:border-neutral-800">
        <p className="mb-5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          Tools and workflow
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-neutral-50">
          {page.data.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-300">
          {page.data.description}
        </p>
      </header>
      <div className="prose-content mx-auto mt-10 max-w-3xl">{body}</div>
    </article>
  );
}
