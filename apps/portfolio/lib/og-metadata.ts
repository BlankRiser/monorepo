import type { Metadata } from "next";

type OgMetadataInput = {
  title: string;
  description: string;
  section?: string;
};

export function createOgMetadata({
  title,
  description,
  section,
}: OgMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const image = `/og?${new URLSearchParams({ title, ...(section ? { section } : {}) })}`;

  return {
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
