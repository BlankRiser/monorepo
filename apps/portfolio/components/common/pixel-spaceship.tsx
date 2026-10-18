"use client";

import { motion } from "motion/react";

interface PixelSpaceshipProps {
  className?: string;
}

export function PixelSpaceship({ className = "" }: PixelSpaceshipProps) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Ambient twinkling pixel stars in the background */}
      <motion.span
        className="absolute -top-4 -left-6 size-1 rounded-none bg-[#94ffaf]"
        animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
        aria-hidden="true"
      />
      <motion.span
        className="absolute top-2 -right-8 size-1 rounded-none bg-[#eaff94]"
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 3.1, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
        aria-hidden="true"
      />
      <motion.span
        className="absolute -bottom-2 -left-8 size-1 rounded-none bg-[#eaff94]"
        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
        aria-hidden="true"
      />
      <motion.span
        className="absolute bottom-4 -right-6 size-1 rounded-none bg-[#94ffaf]"
        animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 3.6, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
        aria-hidden="true"
      />

      {/* Zero-G hovering spaceship container */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
        className="relative flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_0_20px_rgba(148,255,175,0.35)]"
      >
        <svg
          viewBox="0 0 19 19"
          className="size-24 sm:size-28 md:size-32"
          shapeRendering="crispEdges"
          aria-label="Pixel art spaceship"
          role="img"
        >
          {/* Hull Outline (dark neutral in light mode, deep black in dark mode for crisp contrast) */}
          <g className="fill-neutral-900 dark:fill-neutral-950">
            <rect x="9" y="0" width="1" height="1" />
            <rect x="8" y="1" width="1" height="1" />
            <rect x="10" y="1" width="1" height="1" />
            <rect x="8" y="2" width="1" height="1" />
            <rect x="10" y="2" width="1" height="1" />
            <rect x="7" y="3" width="1" height="1" />
            <rect x="11" y="3" width="1" height="1" />
            <rect x="7" y="4" width="1" height="1" />
            <rect x="11" y="4" width="1" height="1" />
            <rect x="6" y="5" width="1" height="1" />
            <rect x="12" y="5" width="1" height="1" />
            <rect x="5" y="6" width="1" height="1" />
            <rect x="13" y="6" width="1" height="1" />
            <rect x="4" y="7" width="1" height="1" />
            <rect x="14" y="7" width="1" height="1" />
            <rect x="3" y="8" width="1" height="1" />
            <rect x="15" y="8" width="1" height="1" />
            <rect x="2" y="9" width="1" height="1" />
            <rect x="16" y="9" width="1" height="1" />
            <rect x="1" y="10" width="1" height="1" />
            <rect x="17" y="10" width="1" height="1" />
            <rect x="0" y="11" width="1" height="1" />
            <rect x="18" y="11" width="1" height="1" />
            <rect x="0" y="12" width="2" height="1" />
            <rect x="7" y="12" width="1" height="1" />
            <rect x="11" y="12" width="1" height="1" />
            <rect x="17" y="12" width="2" height="1" />
            <rect x="1" y="13" width="2" height="1" />
            <rect x="5" y="13" width="2" height="1" />
            <rect x="8" y="13" width="1" height="1" />
            <rect x="10" y="13" width="1" height="1" />
            <rect x="12" y="13" width="2" height="1" />
            <rect x="16" y="13" width="2" height="1" />
            <rect x="3" y="14" width="2" height="1" />
            <rect x="8" y="14" width="1" height="1" />
            <rect x="10" y="14" width="1" height="1" />
            <rect x="14" y="14" width="2" height="1" />
          </g>

          {/* Primary Hull (#94ffaf) */}
          <g fill="#94ffaf">
            <rect x="7" y="5" width="2" height="1" />
            <rect x="10" y="5" width="2" height="1" />
            <rect x="6" y="6" width="3" height="1" />
            <rect x="10" y="6" width="3" height="1" />
            <rect x="5" y="7" width="1" height="1" />
            <rect x="8" y="7" width="3" height="1" />
            <rect x="13" y="7" width="1" height="1" />
            <rect x="4" y="8" width="2" height="1" />
            <rect x="7" y="8" width="5" height="1" />
            <rect x="13" y="8" width="2" height="1" />
            <rect x="3" y="9" width="13" height="1" />
            <rect x="3" y="10" width="13" height="1" />
            <rect x="1" y="11" width="17" height="1" />
            <rect x="2" y="12" width="5" height="1" />
            <rect x="8" y="12" width="3" height="1" />
            <rect x="12" y="12" width="5" height="1" />
            <rect x="3" y="13" width="2" height="1" />
            <rect x="9" y="13" width="1" height="1" />
            <rect x="14" y="13" width="2" height="1" />
          </g>

          {/* Canopy, Wingtip Blasters, and Highlights (#eaff94) */}
          <g fill="#eaff94">
            <rect x="9" y="1" width="1" height="1" />
            <rect x="9" y="2" width="1" height="1" />
            <rect x="8" y="3" width="3" height="1" />
            <rect x="8" y="4" width="3" height="1" />
            <rect x="9" y="5" width="1" height="1" />
            <rect x="9" y="6" width="1" height="1" />
            <rect x="6" y="7" width="2" height="1" />
            <rect x="11" y="7" width="2" height="1" />
            <rect x="6" y="8" width="1" height="1" />
            <rect x="12" y="8" width="1" height="1" />
            <rect x="2" y="10" width="1" height="1" />
            <rect x="16" y="10" width="1" height="1" />
            <rect x="9" y="14" width="1" height="1" />
          </g>

          {/* Animated Thruster Flame */}
          <motion.g
            animate={{
              scaleY: [0.85, 1.25, 0.85],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.55,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "9.5px 14.5px",
              willChange: "transform, opacity",
            }}
          >
            {/* Flame Outline */}
            <g className="fill-neutral-900 dark:fill-neutral-950">
              <rect x="7" y="15" width="1" height="1" />
              <rect x="11" y="15" width="1" height="1" />
              <rect x="8" y="16" width="1" height="1" />
              <rect x="10" y="16" width="1" height="1" />
            </g>
            {/* Flame Outer Core (#94ffaf) */}
            <g fill="#94ffaf">
              <rect x="8" y="15" width="1" height="1" />
              <rect x="10" y="15" width="1" height="1" />
              <rect x="9" y="17" width="1" height="1" />
            </g>
            {/* Flame Inner Flame (#eaff94) */}
            <g fill="#eaff94">
              <rect x="9" y="15" width="1" height="1" />
              <rect x="9" y="16" width="1" height="1" />
            </g>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
