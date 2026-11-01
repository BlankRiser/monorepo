"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  FileText,
  Globe,
  Keyboard,
  Monitor,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  defaultFilter,
} from "@workspace/ui/components/command";

export type PortfolioCommandLink = {
  label: string;
  href: string;
  group: string;
  description?: string;
  keywords?: string;
};

type BlogSearchResult = {
  title: string;
  description: string;
  permalink: string;
  series?: string;
  snippet: string;
  tags: string[];
};

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; results: BlogSearchResult[] };

const itemClassName =
  "min-h-11 items-start rounded-md px-3 py-2 text-foreground data-[selected=true]:bg-emerald-500/10 data-[selected=true]:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:data-[selected=true]:bg-emerald-300/10 dark:focus-visible:ring-emerald-300";

const commandFilter: NonNullable<
  React.ComponentProps<typeof CommandDialog>["commandFilter"]
> = (value, search, keywords) => {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return 1;

  if (
    value.startsWith("appearance:") &&
    /^(theme|light|dark|system)(\s|$)/.test(normalizedSearch)
  ) {
    return 100 + defaultFilter(value, search, keywords);
  }

  if (
    value.startsWith("writing-result:") ||
    value.startsWith("writing-status:")
  ) {
    return 1;
  }

  return defaultFilter(value, search, keywords);
};

export function PortfolioCommandBar({
  links,
}: {
  links: PortfolioCommandLink[];
}) {
  const router = useRouter();
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchState, setSearchState] = React.useState<SearchState>({
    status: "idle",
  });

  const setCommandOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
      setSearchState({ status: "idle" });
    }
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    setSearchState(
      nextQuery.trim().length >= 2 ? { status: "loading" } : { status: "idle" },
    );
  };

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(!open);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    const searchQuery = query.trim();
    if (!open || searchQuery.length < 2) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Writing search failed");
        const data = (await response.json()) as { results: BlogSearchResult[] };
        setSearchState({ status: "success", results: data.results });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSearchState({ status: "error" });
      }
    }, 160);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [open, query]);

  const close = () => setCommandOpen(false);

  const selectLink = (href: string) => {
    close();
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      window.location.assign(href);
    } else if (/^https?:\/\//i.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  const selectTheme = (nextTheme: "light" | "dark" | "system") => {
    setTheme(nextTheme);
    close();
  };

  const groupedLinks = React.useMemo(
    () =>
      links.reduce((groups, link) => {
        const group = groups.get(link.group) ?? [];
        group.push(link);
        groups.set(link.group, group);
        return groups;
      }, new Map<string, PortfolioCommandLink[]>()),
    [links],
  );

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <>
      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        aria-label="Search pages, projects, and writing"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-keyshortcuts="Meta+K Control+K"
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-3.5 text-sm font-medium text-foreground shadow-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-emerald-300"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
          ⌘ K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setCommandOpen}
        commandFilter={commandFilter}
        title="Portfolio search"
        description="Search pages, projects, writing, and change the color theme."
        className="max-w-[calc(100%-1.25rem)] overflow-hidden rounded-xl border-border bg-background p-0 shadow-2xl sm:max-w-xl"
      >
        <div className="border-b border-border bg-background">
          <CommandInput
            value={query}
            onValueChange={handleQueryChange}
            placeholder="Search pages, projects, and writing..."
            className="h-14 px-1 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
        <CommandList className="max-h-[min(62vh,30rem)] px-2 py-2">
          <CommandEmpty className="px-4 py-10 text-muted-foreground">
            No matches. Try a page, project, or phrase from an article.
          </CommandEmpty>

          <CommandGroup heading="Appearance">
            <CommandItem
              value="appearance: light theme color mode"
              onSelect={() => selectTheme("light")}
              className={itemClassName}
            >
              <Sun className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
              <span>Light</span>
              {activeTheme === "light" && <Check className="ml-auto mt-0.5 size-4" aria-label="Selected" />}
            </CommandItem>
            <CommandItem
              value="appearance: dark theme color mode"
              onSelect={() => selectTheme("dark")}
              className={itemClassName}
            >
              <Moon className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
              <span>Dark</span>
              {activeTheme === "dark" && <Check className="ml-auto mt-0.5 size-4" aria-label="Selected" />}
            </CommandItem>
            <CommandItem
              value="appearance: system theme color mode"
              onSelect={() => selectTheme("system")}
              className={itemClassName}
            >
              <Monitor className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
              <span>System</span>
              {theme === "system" && <Check className="ml-auto mt-0.5 size-4" aria-label="Selected" />}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="my-2" />

          {Array.from(groupedLinks.entries()).map(([group, groupLinks]) => (
            <CommandGroup key={group} heading={group}>
              {groupLinks.map((link) => {
                const Icon =
                  group === "Work"
                    ? BriefcaseBusiness
                    : group === "Writing"
                      ? FileText
                      : /^https?:\/\//i.test(link.href)
                        ? ArrowUpRight
                        : Globe;

                return (
                  <CommandItem
                    key={`${link.label}-${link.href}`}
                    value={`${link.label} ${link.description ?? ""} ${link.keywords ?? ""} ${link.href}`}
                    onSelect={() => selectLink(link.href)}
                    className={itemClassName}
                  >
                    <Icon className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{link.label}</span>
                      {link.description && (
                        <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
                          {link.description}
                        </span>
                      )}
                    </span>
                    <span className="sr-only">{link.href}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}

          {searchState.status !== "idle" && (
            <>
              <CommandSeparator className="my-2" />
              <CommandGroup heading="Writing">
                {searchState.status === "loading" && (
                  <CommandItem disabled value="writing-status: searching writing" className={itemClassName}>
                    <Search className="mt-0.5 size-4 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                    <span role="status">Searching articles...</span>
                  </CommandItem>
                )}
                {searchState.status === "error" && (
                  <CommandItem disabled value="writing-status: writing search unavailable" className={itemClassName}>
                    <span role="status">Writing search is unavailable. Try again.</span>
                  </CommandItem>
                )}
                {searchState.status === "success" &&
                  searchState.results.map((result) => (
                    <CommandItem
                      key={result.permalink}
                      value={`writing-result: ${result.title} ${result.description} ${result.series ?? ""} ${result.tags.join(" ")} ${result.snippet}`}
                      onSelect={() => selectLink(result.permalink)}
                      className={itemClassName}
                    >
                      <FileText className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{result.title}</span>
                        <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
                          {result.series ? `${result.series}: ` : ""}
                          {result.snippet || result.description}
                        </span>
                      </span>
                    </CommandItem>
                  ))}
                {searchState.status === "success" && searchState.results.length === 0 && (
                  <CommandItem disabled value="writing-status: no writing matches" className={itemClassName}>
                    <span>No writing matches this search.</span>
                  </CommandItem>
                )}
              </CommandGroup>
            </>
          )}

        </CommandList>
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Keyboard className="size-3.5" aria-hidden="true" />
            Navigate with arrow keys
          </span>
          <span>Enter to open. Esc to close.</span>
        </div>
      </CommandDialog>
    </>
  );
}
