import type { ComponentType } from "react";

export type MDXComponentType = ComponentType<Record<string, unknown>>;

export interface MDXModule {
  default: MDXComponentType;
  frontmatter?: Record<string, unknown>;
}

/**
 * @deprecated MDX rendering is now handled by Fumadocs (@fumadocs/local-md).
 */
export const postRegistry: Record<string, () => Promise<MDXModule>> = {};

/**
 * @deprecated MDX rendering is now handled by Fumadocs (@fumadocs/local-md).
 */
export async function loadPostComponent(
  _slugPath: string,
): Promise<MDXModule | null> {
  return null;
}
