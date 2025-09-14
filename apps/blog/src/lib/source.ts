import { blog as blogPosts, docs, snippets as codeSnippets } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const docsSource = loader({
  // it assigns a URL to your pages
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
});
export const snippetsSource = loader({
  baseUrl: '/snippets',
  source: createMDXSource(codeSnippets),
});

