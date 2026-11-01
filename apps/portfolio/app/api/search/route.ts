import { searchBlogPosts } from "@workspace/writing";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return Response.json({ results: [] });
  }

  return Response.json({ results: searchBlogPosts(query) });
}
