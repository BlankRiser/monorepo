"use client";

import {
  Calculator,
  Calendar,
  Globe,
  Monitor,
  Moon,
  Smile,
  Sun,
} from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui/components/command";
import { useTheme } from "next-themes";

export function PortfolioCommandBar({ hidden = true }: { hidden?: boolean }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className={hidden ? "hidden" : "text-muted-foreground text-sm"}>
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <ThemeList />
          <CommandSeparator />
          <PageList />
        </CommandList>
      </CommandDialog>
    </>
  );
}

function ThemeList() {
  const { setTheme, theme } = useTheme();

  return (
    <CommandGroup heading="Themes">
      <CommandItem value="light" onSelect={(theme) => setTheme(theme)}>
        <Sun />
        <span>Light</span>
      </CommandItem>
      <CommandItem value="dark" onSelect={(theme) => setTheme(theme)}>
        <Moon />
        <span>Dark</span>
      </CommandItem>
      <CommandItem value="system" onSelect={(theme) => setTheme(theme)}>
        <Monitor />
        <span>System</span>
      </CommandItem>
    </CommandGroup>
  );
}

const pages = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Work",
    href: "/work",
  },
];

function PageList() {
  return (
    <CommandGroup heading="Pages">
      {pages.map((page) => (
        <CommandItem key={page.href}>
          <Globe />
          <span>{page.label}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
