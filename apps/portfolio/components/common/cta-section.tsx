"use client";

import { Dithering } from "@paper-design/shaders-react";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const CtaSection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const email = "ramshankar.codes@gmail.com";

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent("Project Inquiry — Let's work together");
    const body = message.trim()
      ? encodeURIComponent(message.trim())
      : encodeURIComponent(
          "Hi Ram,\n\nI'm reaching out regarding a project idea (website / MVP / mobile app / migration).\n\nLet's chat!",
        );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className={cn([
        "relative overflow-hidden rounded-2xl",
        "border border-neutral-200/80 dark:border-neutral-800/80",
        "bg-neutral-100/60 dark:bg-neutral-900/40",
        "p-6 sm:p-10 md:p-12",
        "transition-all duration-300",
      ])}
    >
      {/* Background Animated Dithering Canvas */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30 overflow-hidden">
          <Dithering
            colorBack={isDark ? "#0a0a0a" : "#f5f5f5"}
            colorFront={isDark ? "#94ffaf" : "#262626"}
            shape="warp"
            type="4x4"
            size={2.5}
            speed={0.35}
            scale={0.7}
            fit="cover"
            className="w-full h-full"
          />
        </div>
      )}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Radial fade to smooth the edges and match footer aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/60 via-transparent to-neutral-50/80 dark:from-neutral-950/60 dark:via-transparent dark:to-neutral-950/80 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-5 sm:gap-6">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-neutral-300/80 dark:border-neutral-700/80 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-md text-neutral-800 dark:text-neutral-200 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#94ffaf] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#94ffaf]" />
          </span>
          <span>Available for new projects & contracts</span>
        </div>

        {/* Heading & Subtitle */}
        <div className="flex flex-col gap-2 max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Let’s build something exceptional together
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Have a project, startup MVP, mobile app, or modern stack migration in mind? Send an email to kick off the conversation.
          </p>
        </div>

        {/* Central Email Textbox & Action Container */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {/* Email Bar */}
          <div className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-xl border border-neutral-300/80 dark:border-neutral-700/80 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-xs">
            <div className="flex items-center gap-2.5 pl-2 min-w-0 flex-1">
              <Mail className="size-4 text-neutral-400 shrink-0" />
              <span className="font-mono text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 truncate select-all">
                {email}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className={cn([
                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors",
                  copied
                    ? "bg-[#94ffaf]/20 text-neutral-900 dark:text-[#94ffaf]"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-neutral-800",
                ])}
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-600 dark:text-[#94ffaf]" />
                    <span className="font-mono text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span className="hidden sm:inline font-mono text-[11px]">
                      Copy
                    </span>
                  </>
                )}
              </button>

              <a
                href={getMailtoLink()}
                className={cn([
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs",
                  "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white",
                ])}
                title="Send email via default client"
              >
                <span>Send</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Message Input to Pre-fill Mail Client */}
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a brief project note (e.g. 'Looking for an MVP build')..."
              className={cn([
                "w-full px-3.5 py-2 text-xs rounded-xl font-mono",
                "border border-neutral-300/60 dark:border-neutral-800/80",
                "bg-neutral-50/60 dark:bg-neutral-950/60 backdrop-blur-xs",
                "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                "focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all",
              ])}
            />
            {message.trim() && (
              <a
                href={getMailtoLink()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                title="Send pre-filled email"
              >
                <Send className="size-3.5" />
              </a>
            )}
          </div>

          {/* Footer Sub-caption */}
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            <span>Direct inbox</span>
            <span>•</span>
            <span>Response within 24 hours</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
