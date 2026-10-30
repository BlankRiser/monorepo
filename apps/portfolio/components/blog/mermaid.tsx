"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { renderMermaidSVG, THEMES, type ThemeName } from "beautiful-mermaid";
import { cn } from "@workspace/ui/lib/utils";

interface MermaidProps {
  chart: string;
  theme?: ThemeName;
  className?: string;
}

export function Mermaid({ chart, theme, className }: MermaidProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [fallbackSvg, setFallbackSvg] = useState<string | null>(null);
  const [fallbackError, setFallbackError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Resolve theme configuration for beautiful-mermaid
  const themeConfig = useMemo(() => {
    if (theme && THEMES[theme]) {
      return THEMES[theme];
    }
    return isDark ? THEMES["github-dark"] : THEMES["github-light"];
  }, [theme, isDark]);

  // Attempt synchronous rendering with beautiful-mermaid
  const beautifulSvg = useMemo(() => {
    const trimmed = chart.trim();
    if (!trimmed) return "";
    try {
      return renderMermaidSVG(trimmed, {
        ...themeConfig,
        transparent: true,
        font: "var(--font-sans), system-ui, sans-serif",
      });
    } catch {
      return null;
    }
  }, [chart, themeConfig]);

  // If beautiful-mermaid fails (e.g. specialized diagram syntax), fall back to standard mermaid
  useEffect(() => {
    if (beautifulSvg !== null || !mounted) return;

    let isSubscribed = true;
    async function loadFallback() {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "loose",
        });
        const id = `fallback-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, chart.trim());
        if (isSubscribed) {
          setFallbackSvg(svg);
          setFallbackError(null);
        }
      } catch (err) {
        if (isSubscribed) {
          const message =
            err instanceof Error ? err.message : "Failed to render diagram";
          setFallbackError(message);
        }
      }
    }

    loadFallback();
    return () => {
      isSubscribed = false;
    };
  }, [beautifulSvg, chart, isDark, mounted]);

  const activeSvg = beautifulSvg ?? fallbackSvg;

  if (fallbackError && !activeSvg) {
    return (
      <div className="my-6 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-xs font-mono text-red-600 dark:text-red-400">
        <p className="font-semibold mb-1">Diagram Render Error</p>
        <pre className="overflow-x-auto whitespace-pre-wrap">{fallbackError}</pre>
      </div>
    );
  }

  if (!activeSvg) {
    return (
      <div
        className={cn(
          "my-6 flex h-48 w-full items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 text-neutral-400 text-xs animate-pulse",
          className
        )}
      >
        Rendering diagram...
      </div>
    );
  }

  return (
    <figure
      className={cn(
        "my-8 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-6 flex justify-center items-center transition-colors",
        className
      )}
    >
      <div
        className="beautiful-mermaid-container max-w-full flex justify-center [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: activeSvg }}
      />
    </figure>
  );
}
