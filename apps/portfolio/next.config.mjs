import createMDX from "@next/mdx";
import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from "@shikijs/transformers";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["@workspace/ui", "@workspace/writing"],
  async redirects() {
    return [
      {
        source: "/writing",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeShiki,
        {
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          addLanguageClass: true,
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationFocus(),
          ],
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
