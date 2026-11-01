import { WorkListClient } from "./work-list-client";
import type { Metadata } from "next";
import { createOgMetadata } from "@/lib/og-metadata";

export const metadata: Metadata = {
  title: "Selected work",
  description: "Selected product engineering and design work by Ram Shankar Choudhary.",
  ...createOgMetadata({
    title: "Selected work",
    description: "Selected product engineering and design work by Ram Shankar Choudhary.",
    section: "Portfolio",
  }),
};

export default async function WorkPage() {
  return <WorkListClient />;
}
