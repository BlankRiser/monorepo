import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Fuse from "fuse.js";
import type {
  BlogPostFrontmatter,
  BlogPostMeta,
  ReadingTimeInfo,
  SeriesNavigation,
  TableOfContentsItem,
} from "./types";

export function resolveContentDir(): string {
  try {
    const fromModule = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      "../content",
    );
    if (fs.existsSync(fromModule)) {
      return fromModule;
    }
  } catch {
    // fallback
  }

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

export function calculateReadingTime(content: string): ReadingTimeInfo {
  const clean = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_~`[\]()]/g, "");
  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}

export function extractHeadings(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match && match[1] && match[2]) {
      const level = match[1].length;
      const rawText = match[2].trim();
      const text = rawText
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

interface ScanFile {
  filePath: string;
  relativePath: string;
}

function scanDirectory(dir: string, baseDir: string): ScanFile[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results: ScanFile[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDirectory(fullPath, baseDir));
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      results.push({
        filePath: fullPath,
        relativePath: path.relative(baseDir, fullPath),
      });
    }
  }

  return results;
}

function formatDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0] || "";
  }
  if (typeof value === "string") {
    return value.trim();
  }
  if (value) {
    return String(value);
  }
  return new Date().toISOString().split("T")[0] || "";
}

export function getAllPosts({
  includeDrafts = process.env.NODE_ENV !== "production",
}: {
  includeDrafts?: boolean;
} = {}): BlogPostMeta[] {
  const contentDir = resolveContentDir();
  const files = scanDirectory(contentDir, contentDir);

  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(file.filePath, "utf8");
    const parsed = matter(raw);
    const frontmatter = parsed.data as BlogPostFrontmatter;

    const normalized = file.relativePath.replace(/\\/g, "/");
    const withoutExt = normalized.replace(/\.(md|mdx)$/, "");
    const parts = withoutExt.split("/").filter(Boolean);

    const isIndex = parts[parts.length - 1] === "index";
    const slug = isIndex ? parts.slice(0, -1) : parts;
    const slugPath = slug.join("/");

    if (!includeDrafts && frontmatter.draft) {
      continue;
    }

    const dateStr = formatDateString(frontmatter.date);
    const updatedAtStr = frontmatter.updatedAt
      ? formatDateString(frontmatter.updatedAt)
      : undefined;

    posts.push({
      slug,
      slugPath,
      permalink: `/blog/${slugPath}`,
      frontmatter: {
        title: frontmatter.title || slug[slug.length - 1] || "Untitled",
        description: frontmatter.description || "",
        date: dateStr,
        updatedAt: updatedAtStr,
        author: frontmatter.author || "Ram Shankar",
        tags: frontmatter.tags || [],
        draft: Boolean(frontmatter.draft),
        toc: frontmatter.toc !== false,
        coverImage: frontmatter.coverImage || frontmatter.image,
        series: frontmatter.series,
      },
      readingTime: calculateReadingTime(parsed.content),
      toc: extractHeadings(parsed.content),
      filePath: file.filePath,
      isSeriesRoot: isIndex,
    });
  }

  return posts.sort((a, b) => {
    // If both belong to the same series and have order, sort by series order
    if (
      a.frontmatter.series?.title &&
      a.frontmatter.series?.title === b.frontmatter.series?.title &&
      a.frontmatter.series?.order !== undefined &&
      b.frontmatter.series?.order !== undefined
    ) {
      return a.frontmatter.series.order - b.frontmatter.series.order;
    }
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });
}

export interface BlogSearchResult {
  title: string;
  description: string;
  permalink: string;
  series?: string;
  snippet: string;
  tags: string[];
}

export function searchBlogPosts(query: string, limit = 8): BlogSearchResult[] {
  const normalizedQuery = query.trim().toLowerCase().slice(0, 200);
  if (!normalizedQuery) return [];

  const documents = getAllPosts().map((post) => {
    const raw = fs.readFileSync(post.filePath, "utf8");
    const { content } = matter(raw);
    const searchableContent = content
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[#>*_~`|]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return { post, content: searchableContent };
  });

  const fuse = new Fuse(documents, {
    keys: [
      { name: "post.frontmatter.title", weight: 2 },
      { name: "post.frontmatter.description", weight: 1.5 },
      { name: "post.frontmatter.series.title", weight: 1.2 },
      { name: "post.frontmatter.tags", weight: 1.1 },
      { name: "post.permalink", weight: 0.6 },
      { name: "content", weight: 0.8 },
    ],
    threshold: 0.34,
    ignoreLocation: true,
    includeMatches: true,
    includeScore: true,
    minMatchCharLength: 2,
    useTokenSearch: true,
    tokenMatch: "all",
    tokenize: (text) =>
      text
        .toLowerCase()
        .match(/[\p{L}\p{M}\p{N}_]+/gu)
        ?.map((term) => term.slice(0, 32)) ?? [],
  });

  return fuse.search(normalizedQuery, { limit }).map(({ item, matches }) => {
    const contentMatch = matches?.find((entry) => entry.key === "content");
    const matchIndex = contentMatch?.indices[0]?.[0];
    const snippetStart = Math.max(0, (matchIndex ?? 0) - 72);
    let snippet = matchIndex === undefined
      ? ""
      : item.content.slice(snippetStart, snippetStart + 200);
    if (snippetStart > 0 && snippet) snippet = `…${snippet}`;
    if (snippetStart + 200 < item.content.length && snippet) snippet = `${snippet}…`;

    return {
      title: item.post.frontmatter.title,
      description: item.post.frontmatter.description,
      permalink: item.post.permalink,
      series: item.post.frontmatter.series?.title,
      snippet,
      tags: item.post.frontmatter.tags ?? [],
    };
  });
}

export function getPostBySlug(
  slugParam: string[] | string,
): BlogPostMeta | null {
  const slugArray = Array.isArray(slugParam)
    ? slugParam
    : slugParam.split("/").filter(Boolean);
  const targetPath = slugArray.join("/");

  const allPosts = getAllPosts();
  const matched = allPosts.find((p) => p.slugPath === targetPath);
  return matched || null;
}

export function getChildPosts(seriesSlugPath: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  const prefix = seriesSlugPath ? `${seriesSlugPath}/` : "";
  return allPosts
    .filter(
      (p) =>
        p.slugPath !== seriesSlugPath &&
        p.slugPath.startsWith(prefix) &&
        !p.isSeriesRoot,
    )
    .sort((a, b) => {
      const orderA = a.frontmatter.series?.order ?? 999;
      const orderB = b.frontmatter.series?.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return (
        new Date(a.frontmatter.date).getTime() -
        new Date(b.frontmatter.date).getTime()
      );
    });
}

export function getSeriesNavigation(
  currentSlugPath: string,
): SeriesNavigation | null {
  const currentPost = getPostBySlug(currentSlugPath);
  if (!currentPost) return null;

  const currentSlug = currentPost.slug;
  if (currentSlug.length <= 1 && !currentPost.frontmatter.series?.title) {
    return null;
  }

  const seriesRootPath = currentSlug.slice(0, -1).join("/");
  const allSeriesPosts = getAllPosts()
    .filter((p) => {
      if (currentPost.frontmatter.series?.title) {
        return (
          p.frontmatter.series?.title === currentPost.frontmatter.series?.title
        );
      }
      return seriesRootPath ? p.slugPath.startsWith(seriesRootPath) : false;
    })
    .sort((a, b) => {
      const orderA = a.frontmatter.series?.order ?? 999;
      const orderB = b.frontmatter.series?.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return (
        new Date(a.frontmatter.date).getTime() -
        new Date(b.frontmatter.date).getTime()
      );
    });

  if (allSeriesPosts.length <= 1) return null;

  const currentIndex = allSeriesPosts.findIndex(
    (p) => p.slugPath === currentSlugPath,
  );
  return {
    seriesTitle:
      currentPost.frontmatter.series?.title ||
      currentSlug[0]
        ?.split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" "),
    prev: currentIndex > 0 ? allSeriesPosts[currentIndex - 1] : undefined,
    next:
      currentIndex < allSeriesPosts.length - 1
        ? allSeriesPosts[currentIndex + 1]
        : undefined,
    allPosts: allSeriesPosts,
  };
}
