import { createMetadata } from "@/src/lib/metadata";
import { snippetsSource } from "@/src/lib/source";
import { getMDXComponents } from "@/src/mdx-components";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "node:path";

export default async function Page(props: PageProps<"/snippets/[slug]">) {
  const params = await props.params;
  const page = snippetsSource.getPage([params.slug]);

  if (!page) notFound();
  const { body: Mdx, toc } = page.data;

  return (
    <>
      <div
        className="mx-auto w-full max-w-fd-container rounded-xl mt-12 px-4 py-12 md:px-8"
        style={{
          backgroundColor: "black",
          backgroundImage: [
            "linear-gradient(140deg, hsla(274,94%,54%,0.3), transparent 50%)",
            "linear-gradient(to left top, hsla(260,90%,50%,0.8), transparent 50%)",
            "radial-gradient(circle at 100% 100%, hsla(240,100%,82%,1), hsla(240,40%,40%,1) 17%, hsla(240,40%,40%,0.5) 20%, transparent)",
          ].join(", "),
          backgroundBlendMode: "difference, difference, normal",
        }}
      >
        <h1 className="mb-2 text-3xl font-bold text-white">
          {page.data.title}
        </h1>
        <p className="mb-4 text-white/80">{page.data.description}</p>
        <Link
          href="/snippets"
          className={buttonVariants({ size: "sm", variant: "secondary" })}
        >
          Back
        </Link>
      </div>
      <article className="flex flex-col mx-auto w-full max-w-fd-container py-8 lg:flex-row">
        <div className="prose min-w-0 flex-1 p-4">
          <Mdx components={getMDXComponents()} />
        </div>
      </article>
    </>
  );
}

export async function generateMetadata(
  props: PageProps<"/snippets/[slug]">
): Promise<Metadata> {
  const params = await props.params;
  const page = snippetsSource.getPage([params.slug]);

  if (!page) notFound();

  return createMetadata({
    title: page.data.title,
    description: page.data.description ?? "Code snippets",
  });
}

export function generateStaticParams(): { slug: string }[] {
  return snippetsSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
