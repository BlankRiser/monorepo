import path from "node:path";
import { fileURLToPath } from "node:url";

const appDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["@workspace/ui", "@workspace/writing"],
  outputFileTracingRoot: path.resolve(appDirectory, "../.."),
  outputFileTracingIncludes: {
    "/api/search": [
      "../../packages/writing/content/**/*.md",
      "../../packages/writing/content/**/*.mdx",
    ],
  },
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

export default nextConfig;
