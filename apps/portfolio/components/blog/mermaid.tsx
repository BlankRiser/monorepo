"use client";

import React, { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@workspace/ui/lib/utils";

interface MermaidProps {
  chart: string;
  className?: string;
}

export function Mermaid({ chart, className }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const elementId = `mermaid-${rawId.replace(/[:]/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "neutral",
          securityLevel: "loose",
          fontFamily: "var(--font-sans), sans-serif",
          themeVariables: {
            darkMode: resolvedTheme === "dark",
            background: "transparent",
            primaryColor: resolvedTheme === "dark" ? "#1f2937" : "#f3f4f6",
            primaryTextColor: resolvedTheme === "dark" ? "#f9fafb" : "#111827",
            primaryBorderColor: resolvedTheme === "dark" ? "#374151" : "#e5e7eb",
            lineColor: resolvedTheme === "dark" ? "#9ca3af" : "#4b5563",
          },
        });

        const { svg: renderedSvg } = await mermaid.render(
          elementId,
          chart.trim()
        );

        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : "Failed to render diagram";
          setError(message);
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart, resolvedTheme, elementId]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-xs font-mono text-red-600 dark:text-red-400">
        <p className="font-semibold mb-1">Diagram Render Error</p>
        <pre className="overflow-x-auto whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        className={cn(
          "my-6 flex h-48 w-full items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 text-neutral-400 text-xs animate-pulse",
          className
        )}
      >
        Loading diagram...
      </div>
    );
  }

  return (
    <figure className={cn("my-6 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-4 flex justify-center", className)}>
      <div
        className="mermaid-svg-container max-w-full [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
}
