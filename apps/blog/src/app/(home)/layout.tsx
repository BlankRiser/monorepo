import { baseOptions } from "@/src/lib/layout.shared";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export default function Layout({ children }: LayoutProps<"/">) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
