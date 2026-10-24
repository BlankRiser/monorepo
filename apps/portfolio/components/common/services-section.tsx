"use client";

import { services } from "@workspace/data";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Cpu, Globe, Layers, Pause, Play, Server } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { IsometricExplodedAssembly } from "./isometric-assembly";

const productPillars = [
  {
    id: "interface",
    step: "01",
    layerName: "Interface Layer",
    title: "Websites & Mobile Apps",
    badge: "What Your Customers Touch",
    hook: "Fast, intuitive websites and mobile apps that turn visitors into loyal customers.",
    description:
      "I design and build complete digital products from the ground up: 0-to-1 startup prototypes, brand showcases, and smooth iOS & Android apps. Everything is engineered to load in under a second and feel effortless to use on any screen.",
    deliverables: [
      "0-to-1 Startup MVPs ready to launch in 2 to 4 weeks",
      "High-converting brand websites & web applications",
      "Native iOS & Android mobile apps built with React Native",
      "Modern UI refreshes & legacy codebase migrations",
    ],
    technicalHighlights: ["Next.js", "React Native", "TypeScript", "Tailwind CSS"],
    icon: <Globe className="size-4" aria-hidden="true" />,
  },
  {
    id: "intelligence",
    step: "02",
    layerName: "Intelligence Layer",
    title: "Smart Features & AI Workflows",
    badge: "What Powers Your Business",
    hook: "Automate repetitive tasks, take payments smoothly, and add smart AI workflows.",
    description:
      "Modern products need real intelligence. I build practical AI assistants that understand your data, integrate seamless Stripe checkout and subscriptions, and set up automated workflows that run reliably around the clock.",
    deliverables: [
      "Custom AI assistants, smart chat & semantic search",
      "Stripe payment checkouts, subscriptions & billing portals",
      "Interactive data dashboards, analytics & real-time maps",
      "Automated third-party API connectivity & webhooks",
    ],
    technicalHighlights: ["OpenAI & Gemini", "Stripe", "ECharts & Mapbox", "Vercel AI SDK"],
    icon: <Cpu className="size-4" aria-hidden="true" />,
  },
  {
    id: "foundation",
    step: "03",
    layerName: "Foundation Layer",
    title: "Speed, Security & Cloud",
    badge: "The Rock-Solid Engine",
    hook: "Cloud architecture engineered so your site never crashes and loads instantaneously.",
    description:
      "A great app must be bulletproof. I configure scalable cloud databases, automated daily backups, bank-grade user authentication, and performance optimizations to guarantee 99.9% uptime and zero tech headaches.",
    deliverables: [
      "Sub-second load times & Core Web Vitals 100 tuning",
      "Scalable PostgreSQL cloud databases & auto-scaling",
      "Automated preview links, test pipelines & releases",
      "Full code ownership, clean handoff & post-launch warranty",
    ],
    technicalHighlights: ["PostgreSQL", "AWS Cloud", "Docker & CI/CD", "Strict Security"],
    icon: <Server className="size-4" aria-hidden="true" />,
  },
];

const AUTO_SLIDE_DURATION = 15000; // 15 seconds per layer

export const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isAutoAdvancing =
    !isManualPaused && !isHovered && !isFocused && !shouldReduceMotion;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % productPillars.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + productPillars.length) % productPillars.length,
    );
  }, []);

  useEffect(() => {
    if (!isAutoAdvancing) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isAutoAdvancing, handleNext, activeIndex]);

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 text-balance">
          What I Can Help With
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-pretty leading-relaxed">
          Everything you need to turn an idea into a fast, reliable product — from the interface your customers touch to the cloud engine running behind it.
        </p>
      </div>
      <div className="relative rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/30 p-5 sm:p-7 overflow-hidden flex flex-col gap-6">
        {isAutoAdvancing && !shouldReduceMotion && (
          <motion.div
            key={activeIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: AUTO_SLIDE_DURATION / 1000,
              ease: "linear",
            }}
            className="absolute top-0 left-0 h-0.5 bg-neutral-900/30 dark:bg-neutral-100/30 pointer-events-none"
          />
        )}
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3.5">
          <div
            role="tablist"
            aria-label="Product build layers"
            className="flex items-center gap-1.5"
          >
            {productPillars.map((pillar, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={pillar.id}
                  role="tab"
                  id={`pillar-tab-${pillar.id}`}
                  aria-controls={`pillar-panel-${pillar.id}`}
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className={cn([
                    "px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-150",
                    "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
                    isActive
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold shadow-2xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-neutral-800",
                  ])}
                >
                  <span className="font-mono text-[11px] opacity-75">{pillar.step}</span>
                  <span className="ml-1.5">
                    {pillar.id === "interface"
                      ? "Apps"
                      : pillar.id === "intelligence"
                        ? "AI & Logic"
                        : "Cloud"}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsManualPaused((prev) => !prev)}
              aria-label={
                isManualPaused
                  ? "Resume auto-rotation"
                  : "Pause auto-rotation"
              }
              title={
                isManualPaused
                  ? "Resume auto-rotation"
                  : "Pause auto-rotation"
              }
              className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden"
            >
              {isManualPaused ? (
                <Play className="size-3.5" />
              ) : (
                <Pause className="size-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous layer"
              className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden"
            >
              <ArrowLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next layer"
              className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden"
            >
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center relative w-full pt-1 pb-2">
          <IsometricExplodedAssembly
            activeIndex={activeIndex}
            onSelectLayer={(index) => setActiveIndex(index)}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
          <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 text-center mt-2">
            Click any layer to inspect that part of the product
          </span>
        </div>
        <div className="grid grid-cols-1 grid-rows-1 relative w-full">
          {productPillars.map((pillar, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={pillar.id}
                role="tabpanel"
                id={`pillar-panel-${pillar.id}`}
                aria-labelledby={`pillar-tab-${pillar.id}`}
                aria-hidden={!isActive}
                className={cn([
                  "col-start-1 row-start-1 w-full flex flex-col gap-4 transition-opacity duration-200 ease-out",
                  isActive
                    ? "opacity-100 pointer-events-auto z-10"
                    : "opacity-0 pointer-events-none -z-10 invisible select-none",
                ])}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200">
                      {pillar.icon}
                    </span>
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 text-balance">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
                    {pillar.hook}
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="font-mono text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                    What You Get
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pillar.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/70 dark:bg-neutral-900/60 min-h-[50px]"
                      >
                        <span className="p-0.5 rounded-full bg-[#94ffaf]/20 text-neutral-900 dark:text-[#94ffaf] shrink-0 mt-0.5">
                          <Check className="size-3" aria-hidden="true" />
                        </span>
                        <span className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 w-full">
                  <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 mr-1.5 shrink-0">
                    Powered by:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {pillar.technicalHighlights.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-neutral-200/50 dark:bg-neutral-800/50 border border-neutral-300/40 dark:border-neutral-700/40 text-neutral-700 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col border border-neutral-200/70 dark:border-neutral-800/70 rounded-xl overflow-hidden bg-neutral-100/30 dark:bg-neutral-900/20">
        <button
          type="button"
          onClick={() => setShowTechnicalSpecs((prev) => !prev)}
          className={cn([
            "w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer transition-colors",
            "hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40",
            "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
          ])}
          aria-expanded={showTechnicalSpecs}
        >
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Technical Capability Index
            </span>
            <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              (10 specific services & stack breakdown)
            </span>
          </div>

          <span className="p-1 rounded text-neutral-500 dark:text-neutral-400">
            {showTechnicalSpecs ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </span>
        </button>
        <AnimatePresence>
          {showTechnicalSpecs && (
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, height: 0 }
              }
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60"
            >
              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/60 dark:bg-neutral-900/40 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-xs text-neutral-900 dark:text-neutral-100">
                        {service.title}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
                      {service.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-200/50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};


