import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

interface IsometricExplodedAssemblyProps {
  activeIndex: number;
  onSelectLayer: (index: number) => void;
  shouldReduceMotion: boolean;
}

export const IsometricExplodedAssembly = ({
  activeIndex,
  onSelectLayer,
  shouldReduceMotion,
}: IsometricExplodedAssemblyProps) => {
  return (
    <div className="w-full max-w-[360px] sm:max-w-[420px] aspect-6/5 relative flex items-center justify-center select-none">
      <svg
        viewBox="0 0 360 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible select-none outline-none focus:outline-none"
        style={{ outline: "none" }}
        role="img"
        aria-label="Isometric exploded assembly view showing Interface, Intelligence, and Cloud layers"
      >
        <defs>
          <style>{`
            g:focus, g:focus-visible, svg:focus, svg:focus-visible {
              outline: none !important;
            }
          `}</style>
          {/* Subtle drop shadow for floating isometric planes */}
          <filter id="iso-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="8"
              floodColor="currentColor"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        {/* Ground Floor Soft Shadow */}
        <ellipse
          cx="180"
          cy="265"
          rx="105"
          ry="24"
          className="fill-neutral-900/10 dark:fill-neutral-100/5"
        />

        {/* Vertical Assembly Guide Lines (Connecting Corners in 3D Space) */}
        <g
          className="stroke-neutral-300/70 dark:stroke-neutral-700/60"
          strokeDasharray="3 3"
          strokeWidth="1.2"
        >
          {/* Left Corner Guide */}
          <line x1="80" y1="75" x2="80" y2="235" />
          {/* Right Corner Guide */}
          <line x1="280" y1="75" x2="280" y2="235" />
          {/* Top Corner Guide */}
          <line x1="180" y1="30" x2="180" y2="190" />
          {/* Bottom Corner Guide */}
          <line x1="180" y1="120" x2="180" y2="280" />
        </g>

        {/* LAYER 3: FOUNDATION (Cloud, Database & Engine) */}
        <motion.g
          onClick={() => onSelectLayer(2)}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: activeIndex === 2 ? -6 : [0, 1.5, 0],
                }
          }
          whileHover={shouldReduceMotion ? {} : { y: activeIndex === 2 ? -8 : -3 }}
          transition={{
            duration: activeIndex === 2 ? 0.25 : 3.5,
            repeat: activeIndex === 2 ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="cursor-pointer group outline-none focus:outline-none focus-visible:outline-none select-none"
          style={{ outline: "none" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelectLayer(2);
          }}
          aria-label="Select Foundation Layer"
        >
          {/* Base Isometric Chassis Plane */}
          <polygon
            points="180,190 280,235 180,280 80,235"
            filter="url(#iso-shadow)"
            style={{ outline: "none" }}
            className={cn([
              "transition-colors duration-200 outline-none",
              activeIndex === 2
                ? "fill-neutral-50 dark:fill-neutral-900 stroke-neutral-900 dark:stroke-neutral-100 stroke-2"
                : "fill-neutral-100/90 dark:fill-neutral-900/80 stroke-neutral-300 dark:stroke-neutral-700/80 stroke-[1.2] group-hover:stroke-neutral-900 dark:group-hover:stroke-neutral-100 group-focus:stroke-neutral-900 dark:group-focus:stroke-neutral-100 group-focus-visible:stroke-neutral-900 dark:group-focus-visible:stroke-neutral-100 group-hover:stroke-[1.8] group-focus:stroke-[1.8]",
            ])}
          />

          {/* Internal Grid Lines: Server Infrastructure Grid */}
          <line
            x1="130"
            y1="212"
            x2="230"
            y2="257"
            className="stroke-neutral-200/90 dark:stroke-neutral-800/90 stroke-1"
          />
          <line
            x1="130"
            y1="257"
            x2="230"
            y2="212"
            className="stroke-neutral-200/90 dark:stroke-neutral-800/90 stroke-1"
          />

          {/* Database Cylinder 1 (Isometric Storage Block) */}
          <g transform="translate(145, 222)">
            <ellipse
              cx="12"
              cy="16"
              rx="12"
              ry="5"
              className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700 stroke-1"
            />
            <path
              d="M 0 10 L 0 16 A 12 5 0 0 0 24 16 L 24 10 Z"
              className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700 stroke-1"
            />
            <ellipse
              cx="12"
              cy="10"
              rx="12"
              ry="5"
              className="fill-neutral-100 dark:fill-neutral-700 stroke-neutral-300 dark:stroke-neutral-600 stroke-1"
            />
            {/* Status Indicator LED */}
            <circle
              cx="18"
              cy="14"
              r="1.5"
              className="fill-[#94ffaf]"
            />
          </g>

          {/* Database Cylinder 2 */}
          <g transform="translate(195, 226)">
            <ellipse
              cx="10"
              cy="14"
              rx="10"
              ry="4"
              className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700 stroke-1"
            />
            <path
              d="M 0 9 L 0 14 A 10 4 0 0 0 20 14 L 20 9 Z"
              className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700 stroke-1"
            />
            <ellipse
              cx="10"
              cy="9"
              rx="10"
              ry="4"
              className="fill-neutral-100 dark:fill-neutral-700 stroke-neutral-300 dark:stroke-neutral-600 stroke-1"
            />
            <circle
              cx="15"
              cy="12"
              r="1.5"
              className="fill-[#94ffaf]"
            />
          </g>

          {/* Layer Tag Text */}
          <g transform="translate(288, 235)">
            <text
              x="0"
              y="0"
              dominantBaseline="middle"
              className={cn([
                "font-mono text-[10px] tracking-wide transition-colors duration-200 select-none",
                activeIndex === 2
                  ? "fill-emerald-600 dark:fill-[#94ffaf] font-semibold"
                  : "fill-neutral-400 dark:fill-neutral-500 group-hover:fill-emerald-600 dark:group-hover:fill-[#94ffaf] group-focus:fill-emerald-600 dark:group-focus:fill-[#94ffaf]",
              ])}
            >
              Cloud
            </text>
          </g>
        </motion.g>

        {/* LAYER 2: INTELLIGENCE (Logic, AI & APIs) */}
        <motion.g
          onClick={() => onSelectLayer(1)}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: activeIndex === 1 ? -8 : [0, -2, 0],
                }
          }
          whileHover={shouldReduceMotion ? {} : { y: activeIndex === 1 ? -10 : -4 }}
          transition={{
            duration: activeIndex === 1 ? 0.25 : 3.8,
            repeat: activeIndex === 1 ? 0 : Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="cursor-pointer group outline-none focus:outline-none focus-visible:outline-none select-none"
          style={{ outline: "none" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelectLayer(1);
          }}
          aria-label="Select Intelligence Layer"
        >
          {/* Middle Isometric Plane */}
          <polygon
            points="180,110 280,155 180,200 80,155"
            filter="url(#iso-shadow)"
            style={{ outline: "none" }}
            className={cn([
              "transition-colors duration-200 outline-none",
              activeIndex === 1
                ? "fill-neutral-50 dark:fill-neutral-900 stroke-neutral-900 dark:stroke-neutral-100 stroke-2"
                : "fill-neutral-100/90 dark:fill-neutral-900/80 stroke-neutral-300 dark:stroke-neutral-700/80 stroke-[1.2] group-hover:stroke-neutral-900 dark:group-hover:stroke-neutral-100 group-focus:stroke-neutral-900 dark:group-focus:stroke-neutral-100 group-focus-visible:stroke-neutral-900 dark:group-focus-visible:stroke-neutral-100 group-hover:stroke-[1.8] group-focus:stroke-[1.8]",
            ])}
          />

          {/* Central AI Processor Chip (Isometric Diamond) */}
          <polygon
            points="180,145 204,155 180,165 156,155"
            className={cn([
              "stroke-1 transition-colors duration-200",
              activeIndex === 1
                ? "fill-neutral-900 dark:fill-neutral-100 stroke-neutral-900 dark:stroke-neutral-100"
                : "fill-neutral-200/90 dark:fill-neutral-800/90 stroke-neutral-400 dark:stroke-neutral-600",
            ])}
          />
          {/* Core Spark Indicator */}
          <circle
            cx="180"
            cy="155"
            r="3"
            className="fill-[#94ffaf]"
          />

          {/* Logic & Circuit Bus Traces */}
          <g
            className={cn([
              "stroke-1 fill-none transition-colors duration-200",
              activeIndex === 1
                ? "stroke-neutral-900 dark:stroke-neutral-100"
                : "stroke-neutral-400 dark:stroke-neutral-600 group-hover:stroke-neutral-600 dark:group-hover:stroke-neutral-400",
            ])}
          >
            {/* Left API branch */}
            <path d="M 156 155 L 125 142 L 115 147" />
            <circle cx="115" cy="147" r="2" className="fill-current" />

            {/* Right Payment / Stripe branch */}
            <path d="M 204 155 L 235 142 L 245 147" />
            <circle cx="245" cy="147" r="2" className="fill-current" />

            {/* Workflow connector branch */}
            <path d="M 180 165 L 180 180 L 155 168" />
            <circle cx="155" cy="168" r="2" className="fill-current" />
          </g>

          {/* Layer Tag Text */}
          <g transform="translate(288, 155)">
            <text
              x="0"
              y="0"
              dominantBaseline="middle"
              className={cn([
                "font-mono text-[10px] tracking-wide transition-colors duration-200 select-none",
                activeIndex === 1
                  ? "fill-emerald-600 dark:fill-[#94ffaf] font-semibold"
                  : "fill-neutral-400 dark:fill-neutral-500 group-hover:fill-emerald-600 dark:group-hover:fill-[#94ffaf] group-focus:fill-emerald-600 dark:group-focus:fill-[#94ffaf]",
              ])}
            >
              AI & Logic
            </text>
          </g>
        </motion.g>

        {/* LAYER 1: INTERFACE (UI, Websites & Mobile Apps) */}
        <motion.g
          onClick={() => onSelectLayer(0)}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: activeIndex === 0 ? -10 : [0, -3, 0],
                }
          }
          whileHover={shouldReduceMotion ? {} : { y: activeIndex === 0 ? -12 : -5 }}
          transition={{
            duration: activeIndex === 0 ? 0.25 : 4,
            repeat: activeIndex === 0 ? 0 : Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          className="cursor-pointer group outline-none focus:outline-none focus-visible:outline-none select-none"
          style={{ outline: "none" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelectLayer(0);
          }}
          aria-label="Select Interface Layer"
        >
          {/* Top Isometric Plane */}
          <polygon
            points="180,30 280,75 180,120 80,75"
            filter="url(#iso-shadow)"
            style={{ outline: "none" }}
            className={cn([
              "transition-colors duration-200 outline-none",
              activeIndex === 0
                ? "fill-neutral-50 dark:fill-neutral-900 stroke-neutral-900 dark:stroke-neutral-100 stroke-2"
                : "fill-neutral-100/90 dark:fill-neutral-900/80 stroke-neutral-300 dark:stroke-neutral-700/80 stroke-[1.2] group-hover:stroke-neutral-900 dark:group-hover:stroke-neutral-100 group-focus:stroke-neutral-900 dark:group-focus:stroke-neutral-100 group-focus-visible:stroke-neutral-900 dark:group-focus-visible:stroke-neutral-100 group-hover:stroke-[1.8] group-focus:stroke-[1.8]",
            ])}
          />

          {/* Browser Window Header Bar (Isometric Wireframe) */}
          <line
            x1="110"
            y1="63"
            x2="170"
            y2="90"
            className="stroke-neutral-300 dark:stroke-neutral-700 stroke-1"
          />
          <circle cx="118" cy="67" r="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
          <circle cx="125" cy="70" r="1.5" className="fill-neutral-400 dark:fill-neutral-600" />

          {/* Web App Hero Card Wireframe */}
          <polygon
            points="145,70 195,92 175,102 125,80"
            className="fill-neutral-200/70 dark:fill-neutral-800/70 stroke-neutral-300/80 dark:stroke-neutral-700/80 stroke-1"
          />

          {/* Floating Mobile Screen Wireframe (Isometric Phone) */}
          <polygon
            points="215,68 250,83 235,90 200,75"
            className="fill-neutral-200/90 dark:fill-neutral-800/90 stroke-neutral-400 dark:stroke-neutral-600 stroke-1"
          />

          {/* Primary Action Button (Mint Accent Pill) */}
          <polygon
            points="140,88 165,99 157,103 132,92"
            className="fill-[#94ffaf]/30 stroke-[#94ffaf] stroke-[1.2]"
          />

          {/* Layer Tag Text */}
          <g transform="translate(288, 75)">
            <text
              x="0"
              y="0"
              dominantBaseline="middle"
              className={cn([
                "font-mono text-[10px] tracking-wide transition-colors duration-200 select-none",
                activeIndex === 0
                  ? "fill-emerald-600 dark:fill-[#94ffaf] font-semibold"
                  : "fill-neutral-400 dark:fill-neutral-500 group-hover:fill-emerald-600 dark:group-hover:fill-[#94ffaf] group-focus:fill-emerald-600 dark:group-focus:fill-[#94ffaf]",
              ])}
            >
              Interface
            </text>
          </g>
        </motion.g>
      </svg>
    </div>
  );
};