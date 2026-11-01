import { works } from "@workspace/data";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { WorkDetailClient } from "./work-detail-client";
import { getProjectSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createOgMetadata } from "@/lib/og-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: work.company,
    description: work.description,
    ...createOgMetadata({
      title: work.company,
      description: work.description,
      section: "Selected work",
    }),
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    notFound();
  }

  let caseStudyContent: ReactNode = null;

  const caseStudySlug =
    work.slug === "konnect" || work.slug === "cosmic-zoom"
      ? work.slug
      : null;

  if (caseStudySlug) {
    const source = await getProjectSource();
    const page = source.getPage([caseStudySlug]);

    if (page) {
      const { render } = await page.data.load();
      const rendered = await render(getMDXComponents());
      caseStudyContent = rendered.body;
    }
  }

  return (
    <WorkDetailClient work={work} caseStudyContent={caseStudyContent} />
  );
}
