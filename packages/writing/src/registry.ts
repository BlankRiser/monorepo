import type { ComponentType } from "react";

export type MDXComponentType = ComponentType<Record<string, unknown>>;

export interface MDXModule {
  default: MDXComponentType;
  frontmatter?: Record<string, unknown>;
}

export const postRegistry: Record<string, () => Promise<MDXModule>> = {
  welcome: () =>
    import("../content/welcome.mdx") as unknown as Promise<MDXModule>,
  "learn-react": () =>
    import("../content/learn-react/index.mdx") as unknown as Promise<MDXModule>,
  "learn-react/learning-hooks/use-context": () =>
    import(
      "../content/learn-react/learning-hooks/use-context.mdx"
    ) as unknown as Promise<MDXModule>,
  "learn-react/learning-hooks/use-state": () =>
    import(
      "../content/learn-react/learning-hooks/use-state.mdx"
    ) as unknown as Promise<MDXModule>,
};

export async function loadPostComponent(
  slugPath: string
): Promise<MDXModule | null> {
  const loader = postRegistry[slugPath];
  if (loader) {
    try {
      return await loader();
    } catch (err) {
      console.error(`Failed to load MDX for slug "${slugPath}":`, err);
      return null;
    }
  }
  return null;
}
