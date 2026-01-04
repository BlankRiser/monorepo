import { works, type Work } from "@/data/work";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkDetailClient } from "./work-detail-client";

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
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    notFound();
  }

  return <WorkDetailClient work={work} />;
}
