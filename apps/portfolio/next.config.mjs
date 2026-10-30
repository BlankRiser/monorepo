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

export default nextConfig;
