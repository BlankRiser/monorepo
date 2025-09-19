import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "../components/ui/logo";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: "https://github.com/blankriser/monorepo",
    nav: {
      title: (
        <>
          <Logo />
          blog.ram.codes
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "Blog",
        url: "/blog",
        active: "nested-url",
      },
      {
        text: "Snippets",
        url: "/snippets",
        active: "nested-url",
      },
    ],
    themeSwitch: {
      mode: "light-dark-system",
    },
  };
}
