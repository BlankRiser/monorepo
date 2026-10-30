import { localMd } from "@fumadocs/local-md";
import { dynamicLoader } from "fumadocs-core/source";
import { pageSchema } from "fumadocs-core/source/schema";
import {
  remarkMdxMermaid,
  rehypeCode,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { z } from "zod";
import path from "node:path";
import fs from "node:fs";

export const blogPostSchema = pageSchema.extend({
  date: z.string(),
  updatedAt: z.string().optional(),
  author: z.string().default("Ram Shankar"),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  toc: z.boolean().default(true),
  coverImage: z.string().optional(),
  image: z.string().optional(),
  series: z
    .object({
      title: z.string().optional(),
      order: z.number().optional(),
    })
    .optional(),
});

function resolveContentDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "../../packages/writing/content"),
    path.resolve(process.cwd(), "../writing/content"),
    path.resolve(process.cwd(), "packages/writing/content"),
    path.resolve(process.cwd(), "content"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return path.resolve(process.cwd(), "../../packages/writing/content");
}

export const blogDocs = localMd({
  dir: resolveContentDir(),
  frontmatterSchema: blogPostSchema,
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid],
    rehypeCodeOptions: false,
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeCode,
        {
          ...rehypeCodeDefaultOptions,
          themes: {
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
          transformers: [
            ...(rehypeCodeDefaultOptions.transformers ?? []),
            {
              name: "add-lang-meta",
              pre(this: any, node: any) {
                if (this.options?.lang) {
                  node.properties = node.properties || {};
                  node.properties["data-language"] = this.options.lang;
                }
              },
            },
          ],
        },
      ],
    ],
  },
  mdOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid],
    rehypeCodeOptions: false,
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeCode,
        {
          ...rehypeCodeDefaultOptions,
          themes: {
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
          transformers: [
            ...(rehypeCodeDefaultOptions.transformers ?? []),
            {
              name: "add-lang-meta",
              pre(this: any, node: any) {
                if (this.options?.lang) {
                  node.properties = node.properties || {};
                  node.properties["data-language"] = this.options.lang;
                }
              },
            },
          ],
        },
      ],
    ],
  },
});

export const blogSource = dynamicLoader(blogDocs.dynamicSource(), {
  baseUrl: "/blog",
});

export async function getBlogSource() {
  return blogSource.get();
}
