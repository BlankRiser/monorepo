"use client";

/* Hallmark · process-section · Auto-Advancing Sprint Roadmap */

import { workProcessSteps, type ProcessStep } from "@workspace/data";
import { cn } from "@workspace/ui/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Compass,
  Layers,
  Pause,
  Play,
  Rocket,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const stepIcons: Record<string, React.ReactNode> = {
  "01": <Compass className="size-4" aria-hidden="true" />,
  "02": <Layers className="size-4" aria-hidden="true" />,
  "03": <Code2 className="size-4" aria-hidden="true" />,
  "04": <Rocket className="size-4" aria-hidden="true" />,
};

const stepCadence: Record<string, string> = {
  "01": "Milestone 1 — Days 1–3",
  "02": "Milestone 2 — Week 1",
  "03": "Milestone 3 — Fast Sprints",
  "04": "Milestone 4 — Production Launch",
};

const AUTO_SLIDE_DURATION = 30000; // 30 seconds

export const ProcessSection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isAutoAdvancing =
    !isManualPaused && !isHovered && !isFocused && !shouldReduceMotion;

  const currentStep: ProcessStep =
    workProcessSteps[activeStepIndex] ?? (workProcessSteps[0] as ProcessStep);

  const handleNext = useCallback(() => {
    setActiveStepIndex((prev) => (prev + 1) % workProcessSteps.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveStepIndex(
      (prev) => (prev - 1 + workProcessSteps.length) % workProcessSteps.length,
    );
  }, []);

  // 30-second auto-slide interval
  useEffect(() => {
    if (!isAutoAdvancing) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isAutoAdvancing, handleNext, activeStepIndex]);

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
      {/* Section Head: Direct, honest, balanced */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 text-balance">
          Work Process
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-pretty leading-relaxed">
          How we take an idea from whiteboard to production. A transparent, sprint-driven workflow designed to eliminate guesswork and ship rapidly.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Step Selector Ribbon */}
        <div
          role="tablist"
          aria-label="Process milestone steps"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {workProcessSteps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPast = idx < activeStepIndex;

            return (
              <button
                key={step.step}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveStepIndex(idx)}
                className={cn([
                  "flex flex-col gap-1 p-3 rounded-xl border text-left cursor-pointer",
                  "transition-colors duration-150 ease-out",
                  "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-2xs"
                    : "bg-neutral-100/50 dark:bg-neutral-900/30 border-neutral-200/80 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
                ])}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn([
                      "font-mono text-xs tabular-nums font-semibold",
                      isActive
                        ? "text-neutral-300 dark:text-neutral-600"
                        : "text-neutral-400 dark:text-neutral-500",
                    ])}
                  >
                    {step.step}
                  </span>
                  <span
                    className={cn([
                      "shrink-0",
                      isActive
                        ? "text-white dark:text-neutral-900"
                        : "text-neutral-500 dark:text-neutral-400",
                    ])}
                  >
                    {isPast ? (
                      <Check className="size-3.5" aria-hidden="true" />
                    ) : (
                      stepIcons[step.step] || (
                        <Sparkles className="size-3.5" aria-hidden="true" />
                      )
                    )}
                  </span>
                </div>

                <span
                  className={cn([
                    "text-xs font-medium truncate",
                    isActive
                      ? "text-white dark:text-neutral-900 font-semibold"
                      : "text-neutral-800 dark:text-neutral-200",
                  ])}
                >
                  {step.title.split("&")[0]?.trim() || step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Console Card */}
        <div className="relative rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/30 p-5 sm:p-7 flex flex-col gap-6 overflow-hidden">
          {/* Subtle 30s countdown progress bar */}
          {isAutoAdvancing && !shouldReduceMotion && (
            <motion.div
              key={activeStepIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTO_SLIDE_DURATION / 1000,
                ease: "linear",
              }}
              className="absolute top-0 left-0 h-[2px] bg-neutral-900/30 dark:bg-neutral-100/30 pointer-events-none"
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.step}
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              {/* Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200">
                    {stepIcons[currentStep.step]}
                  </span>
                  <span className="font-mono text-xs font-medium text-neutral-900 dark:text-neutral-100">
                    Phase {currentStep.step} of 04
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                    {stepCadence[currentStep.step]}
                  </span>

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
                    className="p-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden"
                  >
                    {isManualPaused ? (
                      <Play className="size-3.5" />
                    ) : (
                      <Pause className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Title and Summary */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 text-balance">
                  {currentStep.title}
                </h3>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-pretty">
                  {currentStep.summary}
                </p>
              </div>

              {/* Narrative Description */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
                {currentStep.description}
              </p>

              {/* Core Sprint Activities / Deliverables Checklist */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-mono text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                  Phase Activities & Milestones
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {currentStep.activities.map((activity) => (
                    <div
                      key={activity}
                      className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/70 dark:bg-neutral-900/60"
                    >
                      <span className="p-0.5 rounded-full bg-[#94ffaf]/20 text-neutral-900 dark:text-[#94ffaf] shrink-0 mt-0.5">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation Foot */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous phase"
              className={cn([
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-150",
                "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-800",
                "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
              ])}
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              <span>Previous phase</span>
            </button>

            {/* Step indicator marks */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {workProcessSteps.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  aria-label={`Jump to phase ${s.step}`}
                  className={cn([
                    "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                    idx === activeStepIndex
                      ? "w-6 bg-neutral-900 dark:bg-neutral-100"
                      : "w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500",
                  ])}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next phase"
              className={cn([
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-150",
                "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white shadow-2xs",
                "focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 focus-visible:outline-hidden",
              ])}
            >
              <span>Next phase</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
