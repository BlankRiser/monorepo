import { ImageResponse } from "next/og";

export const runtime = "edge";

const ogTokens = {
  background: "#0b0d0c",
  foreground: "#f5f7f5",
  accent: "#94ffaf",
} as const;

const logoPath =
  "M66.8683 98.5469C45.4187 110.104 33.6213 123.801 33.6213 123.801L34.2135 99.5867C66.7147 78.5682 70.9438 47.8249 70.9438 47.8249C64.0799 54.0313 37.9112 59.3818 37.9112 59.3818L56.7871 57.2417C53.0208 73.6128 36.97 83.8889 36.97 83.8889C30.3206 72.118 17.1051 42.0464 17.1051 42.0464C25.8995 37.552 42.2012 19.3605 42.2012 19.3605C47.7782 19.7885 66.2249 17.4344 66.2249 17.4344C73.7322 32.4156 93.895 47.8249 93.895 47.8249C84.8861 60.2378 66.8683 98.5469 66.8683 98.5469ZM72.2359 0C48.9202 5.28069 35.3313 0.998932 35.3313 0.998932C15.0195 31.8269 0 33.254 0 33.254C6.58 47.5261 30.4679 88.7727 30.4679 88.7727L21.1701 97.0503L21.3132 150C43.4846 117.317 72.5218 104.329 72.5218 104.329C74.8106 88.2017 111 39.8191 111 39.8191C84.6804 32.2549 72.2359 0 72.2359 0Z";

function getTitleLines(title: string, maxCharacters: number) {
  const words = title.split(/\s+/).filter(Boolean);
  const lines = [""];

  for (const word of words) {
    const currentLine = lines.length - 1;
    const candidate = lines[currentLine]
      ? `${lines[currentLine]} ${word}`
      : word;

    if (!lines[currentLine] || candidate.length <= maxCharacters) {
      lines[currentLine] = candidate;
    } else if (lines.length < 2) {
      lines.push(word);
    } else {
      const lastLine = (lines[1] ?? "").slice(0, maxCharacters - 1).trimEnd();
      lines[1] = `${lastLine}…`;
      return lines;
    }
  }

  return lines;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Ram Shankar Choudhary").trim() || "Ram Shankar Choudhary";
  const section = searchParams.get("section")?.slice(0, 80);
  const titleSize = title.length > 65 ? 56 : title.length > 40 ? 64 : 72;
  const titleLines = getTitleLines(title, titleSize === 56 ? 34 : titleSize === 64 ? 30 : 27);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 68px",
          backgroundColor: ogTokens.background,
          color: ogTokens.foreground,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg aria-hidden="true" width="31" height="42" viewBox="0 0 111 150" fill="none">
              <path d={logoPath} fill={ogTokens.accent} />
            </svg>
            <span style={{ fontSize: 23, fontWeight: 600, letterSpacing: -1 }}>ram.codes</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1030 }}>
          {section && (
            <div style={{ color: ogTokens.accent, fontSize: 22, fontWeight: 500, letterSpacing: 1.2 }}>
              {section}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", fontSize: titleSize, fontWeight: 650, lineHeight: 1.08, letterSpacing: -2.4, overflowWrap: "anywhere" }}>
            {titleLines.map((line, index) => (
              <div key={`${index}-${line}`}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
