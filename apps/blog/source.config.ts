import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";

import z from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      author: z.string(),
      date: z.string().date().or(z.date()),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: z.object({
    author: z.string(),
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    date: z.string().date().or(z.date()),
  }),
});

export const snippets = defineCollections({
  type: "doc",
  dir: "content/snippets",
  schema: z.object({
    author: z.string(),
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    date: z.string().date().or(z.date()),
  }),
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      lazy: true,
      experimentalJSEngine: true,
      langs: ["ts", "js", "html", "tsx", "mdx", "shellscript", "bash", "json", "yaml", "sql", "python", "py"],
      inline: "tailing-curly-colon",
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
    },
  },
});
