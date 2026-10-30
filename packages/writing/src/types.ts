export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  draft?: boolean;
  toc?: boolean;
  coverImage?: string;
  image?: string;
  series?: {
    title?: string;
    order?: number;
  };
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface ReadingTimeInfo {
  text: string;
  minutes: number;
  words: number;
}

export interface BlogPostMeta {
  slug: string[];
  slugPath: string;
  permalink: string;
  frontmatter: BlogPostFrontmatter;
  readingTime: ReadingTimeInfo;
  toc: TableOfContentsItem[];
  filePath: string;
  isSeriesRoot?: boolean;
}

export interface SeriesNavigation {
  seriesTitle?: string;
  prev?: BlogPostMeta;
  next?: BlogPostMeta;
  allPosts: BlogPostMeta[];
}
