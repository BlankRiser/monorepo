import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  Lightbulb,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

type CalloutType = "note" | "tip" | "warning" | "caution" | "info";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const typeConfigs: Record<
  CalloutType,
  {
    icon: React.ComponentType<{ className?: string }>;
    containerClass: string;
    iconClass: string;
    defaultTitle: string;
  }
> = {
  note: {
    icon: Info,
    containerClass:
      "bg-neutral-500/5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200",
    iconClass: "text-neutral-600 dark:text-neutral-400",
    defaultTitle: "Note",
  },
  tip: {
    icon: Lightbulb,
    containerClass:
      "bg-emerald-500/5 border-emerald-500/20 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-100",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    defaultTitle: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    containerClass:
      "bg-amber-500/5 border-amber-500/20 dark:border-amber-500/30 text-amber-950 dark:text-amber-100",
    iconClass: "text-amber-600 dark:text-amber-400",
    defaultTitle: "Warning",
  },
  caution: {
    icon: AlertOctagon,
    containerClass:
      "bg-rose-500/5 border-rose-500/20 dark:border-rose-500/30 text-rose-950 dark:text-rose-100",
    iconClass: "text-rose-600 dark:text-rose-400",
    defaultTitle: "Caution",
  },
  info: {
    icon: Info,
    containerClass:
      "bg-sky-500/5 border-sky-500/20 dark:border-sky-500/30 text-sky-950 dark:text-sky-100",
    iconClass: "text-sky-600 dark:text-sky-400",
    defaultTitle: "Information",
  },
};

export function Callout({
  type = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const config = typeConfigs[type] || typeConfigs.note;
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <aside
      className={cn(
        "my-6 rounded-lg border p-4 text-sm leading-relaxed transition-colors",
        config.containerClass,
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2 font-medium tracking-tight">
        <Icon className={cn("size-4 shrink-0", config.iconClass)} />
        <span>{displayTitle}</span>
      </div>
      <div className="text-neutral-700 dark:text-neutral-300 [&>p]:my-1.5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
