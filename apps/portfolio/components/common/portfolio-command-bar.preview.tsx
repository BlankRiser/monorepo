import { ArrowUpRight, FileText, Search } from "lucide-react";

const triggerClassName =
  "inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-3.5 text-sm font-medium text-foreground shadow-sm";
const rowClassName =
  "flex min-h-14 items-center justify-between gap-4 border-b border-border px-4 last:border-b-0";

export function PortfolioCommandBarPreview() {
  return (
    <main className="mx-auto my-8 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-xl">
      <header className="border-b border-border px-5 py-4">
        <h1 className="text-base font-semibold">Command bar states</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search and article feedback in the light or dark theme.
        </p>
      </header>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Default</span>
        <button type="button" className={triggerClassName}>
          <Search className="size-4" aria-hidden="true" /> Search
        </button>
      </div>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Hover</span>
        <button type="button" className={`${triggerClassName} bg-muted`}>
          <Search className="size-4" aria-hidden="true" /> Search
        </button>
      </div>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Focus visible</span>
        <button
          type="button"
          className={`${triggerClassName} outline-none ring-2 ring-emerald-700 ring-offset-2 ring-offset-background dark:ring-emerald-300`}
        >
          <Search className="size-4" aria-hidden="true" /> Search
        </button>
      </div>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Active</span>
        <button type="button" className={`${triggerClassName} translate-y-px bg-muted`}>
          <Search className="size-4" aria-hidden="true" /> Search
        </button>
      </div>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Disabled</span>
        <button type="button" disabled className={`${triggerClassName} cursor-not-allowed opacity-50`}>
          <Search className="size-4" aria-hidden="true" /> Search
        </button>
      </div>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Loading</span>
        <span role="status" className="inline-flex items-center gap-2 text-sm">
          <Search className="size-4 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          Searching articles...
        </span>
      </div>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Error</span>
        <span role="status" className="text-sm text-destructive">
          Search is unavailable. Try again.
        </span>
      </div>
      <div className={rowClassName}>
        <span className="text-sm text-muted-foreground">Success</span>
        <button type="button" className={`${triggerClassName} w-72 justify-start`}>
          <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate text-left">React Hooks</span>
          <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
