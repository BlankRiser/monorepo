import { baseOptions } from "@/src/lib/layout.shared";
import { docsSource } from "@/src/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={docsSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
