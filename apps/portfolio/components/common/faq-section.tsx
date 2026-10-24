"use client";

/* Hallmark · faq-section · Knowledge Accordion Ledger */

import { faqs, type FAQItem } from "@workspace/data";
import { cn } from "@workspace/ui/lib/utils";
import { Mail, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

export const FaqSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(
    () => "pricing-structure",
  );
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const directMailtoHref = `mailto:ramshankarcodes@gmail.com?subject=${encodeURIComponent(
    "Project Inquiry — Portfolio FAQ",
  )}&body=${encodeURIComponent(
    "Hi Ram,\n\nI was reviewing your portfolio FAQ and have a question regarding a potential project:\n\n• Project Overview: \n• Tech Stack / Deliverables: \n• Target Timeline: \n\nLooking forward to hearing from you!\n\nBest,",
  )}`;

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-6"
    >
      {/* Section Head: Direct, honest, balanced */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 text-balance">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-pretty leading-relaxed">
          Key considerations before partnering on your next software project, from pricing structures and sprint cycles to code ownership.
        </p>
      </div>

      {/* Accordion Questions Ledger */}
      <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 divide-y divide-neutral-200/70 dark:divide-neutral-800/70 bg-neutral-100/30 dark:bg-neutral-900/20 overflow-hidden">
        {faqs.map((faq, index) => {
          const isExpanded = expandedId === faq.id;
          const indexLabel = String(index + 1).padStart(2, "0");

          return (
            <FaqItemRow
              key={faq.id}
              faq={faq}
              indexLabel={indexLabel}
              isExpanded={isExpanded}
              onToggle={() => toggleItem(faq.id)}
            />
          );
        })}
      </div>

      {/* Direct Contact Context Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/40 dark:bg-neutral-900/30 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-1 rounded bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200">
            <Mail className="size-3.5" aria-hidden="true" />
          </span>
          <span className="text-neutral-600 dark:text-neutral-400">
            Have a project requirement or question not addressed here?
          </span>
        </div>
        <a
          href={directMailtoHref}
          className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline shrink-0"
        >
          Send a direct inquiry
        </a>
      </div>
    </motion.section>
  );
};

interface FaqItemRowProps {
  faq: FAQItem;
  indexLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const FaqItemRow = ({
  faq,
  indexLabel,
  isExpanded,
  onToggle,
}: FaqItemRowProps) => {
  const contentId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn([
        "group/faq transition-colors duration-150 ease-out",
        isExpanded
          ? "bg-neutral-50/80 dark:bg-neutral-900/50"
          : "hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30",
      ])}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className={cn([
          "w-full flex items-start justify-between gap-3.5 p-4 sm:p-5 text-left cursor-pointer",
          "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
        ])}
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="font-mono text-xs tabular-nums text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5">
            {indexLabel}
          </span>
          <h3 className="text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100 leading-snug text-balance">
            {faq.question}
          </h3>
        </div>

        {/* Plus / Close Icon Indicator */}
        <span
          className={cn([
            "size-6 rounded-md flex items-center justify-center shrink-0 mt-0.5",
            "border border-neutral-200 dark:border-neutral-800",
            "bg-neutral-50 dark:bg-neutral-900",
            "text-neutral-600 dark:text-neutral-300",
            "transition-colors duration-150 group-hover/faq:border-neutral-300 dark:group-hover/faq:border-neutral-700",
          ])}
          aria-hidden="true"
        >
          <motion.span
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Plus className="size-3.5" />
          </motion.span>
        </span>
      </button>

      {/* Answer Content Drawer */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={contentId}
            role="region"
            aria-label={faq.question}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, height: "auto" }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed text-pretty pt-2 pl-6 sm:pl-7">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
