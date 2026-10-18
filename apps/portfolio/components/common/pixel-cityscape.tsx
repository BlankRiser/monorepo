"use client";

import { motion } from "motion/react";

interface PixelCityscapeProps {
  className?: string;
}

export function PixelCityscape({ className = "" }: PixelCityscapeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden select-none pt-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-100/60 dark:bg-neutral-900/40 p-2 sm:p-4 ${className}`}
      aria-label="Pixel art cityscape with flying spaceships"
      role="img"
    >
      <svg
        viewBox="0 0 600 130"
        className="w-full h-auto"
        shapeRendering="crispEdges"
      >
        <defs>
          {/* Subtle gradient to ground the cityscape */}
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="600" height="130" fill="url(#skyFade)" />

        {/* Ambient Twinkling Pixel Stars */}
        <g>
          <motion.rect
            x="45"
            y="12"
            width="2"
            height="2"
            fill="#eaff94"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="160"
            y="8"
            width="1"
            height="1"
            fill="#94ffaf"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3.1, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="270"
            y="16"
            width="2"
            height="2"
            fill="#94ffaf"
            animate={{ opacity: [0.15, 0.85, 0.15] }}
            transition={{ duration: 2.7, delay: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="395"
            y="6"
            width="1"
            height="1"
            fill="#eaff94"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="510"
            y="14"
            width="2"
            height="2"
            fill="#94ffaf"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3.4, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="575"
            y="9"
            width="1"
            height="1"
            fill="#eaff94"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2.9, delay: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* ======================================================== */}
        {/* Layer 1: Background Silhouette Skyline                   */}
        {/* ======================================================== */}
        <g className="fill-neutral-200 dark:fill-neutral-900/60">
          <rect x="12" y="42" width="45" height="88" />
          <rect x="68" y="28" width="36" height="102" />
          <rect x="116" y="48" width="48" height="82" />
          <rect x="176" y="22" width="42" height="108" />
          <rect x="232" y="52" width="58" height="78" />
          <rect x="302" y="38" width="44" height="92" />
          <rect x="362" y="26" width="34" height="104" />
          <rect x="412" y="46" width="54" height="84" />
          <rect x="482" y="32" width="42" height="98" />
          <rect x="536" y="42" width="54" height="88" />
        </g>

        {/* ======================================================== */}
        {/* Layer 2: Midground Buildings & Rooftops                  */}
        {/* ======================================================== */}
        <g className="fill-neutral-300 dark:fill-neutral-800">
          {/* Spire 1 */}
          <rect x="28" y="58" width="32" height="72" />
          <rect x="42" y="46" width="4" height="12" />
          <rect x="43" y="36" width="2" height="10" />

          {/* Stepped Building 2 */}
          <rect x="74" y="52" width="48" height="78" />
          <rect x="86" y="40" width="24" height="12" />

          {/* Slanted / Antenna Tower 3 */}
          <rect x="135" y="60" width="38" height="70" />

          {/* Central Highrise 4 */}
          <rect x="190" y="44" width="46" height="86" />
          <rect x="204" y="32" width="18" height="12" />
          <rect x="212" y="22" width="2" height="10" />

          {/* Skybridge Complex 5 */}
          <rect x="250" y="56" width="36" height="74" />
          <rect x="286" y="70" width="18" height="6" />
          <rect x="304" y="50" width="38" height="80" />
          <rect x="320" y="38" width="6" height="12" />

          {/* Communications Needle 6 */}
          <rect x="352" y="62" width="40" height="68" />
          <rect x="370" y="36" width="4" height="26" />
          <rect x="371" y="26" width="2" height="10" />

          {/* Helipad Complex 7 */}
          <rect x="408" y="66" width="52" height="64" />
          <rect x="420" y="60" width="28" height="6" />

          {/* High-tech Tower 8 */}
          <rect x="472" y="48" width="44" height="82" />
          <rect x="484" y="36" width="20" height="12" />
          <rect x="493" y="26" width="2" height="10" />

          {/* Right Waterfront Towers 9 */}
          <rect x="528" y="64" width="38" height="66" />
          <rect x="572" y="74" width="28" height="56" />
        </g>

        {/* ======================================================== */}
        {/* Layer 3: Foreground Detailed Structures                  */}
        {/* ======================================================== */}
        <g className="fill-neutral-400 dark:fill-neutral-900">
          <rect x="0" y="80" width="24" height="50" />
          <rect x="34" y="68" width="36" height="62" />
          <rect x="88" y="62" width="42" height="68" />
          <rect x="144" y="72" width="34" height="58" />
          <rect x="194" y="56" width="42" height="74" />
          <rect x="252" y="68" width="32" height="62" />
          <rect x="308" y="62" width="34" height="68" />
          <rect x="356" y="70" width="38" height="60" />
          <rect x="412" y="74" width="48" height="56" />
          <rect x="476" y="58" width="40" height="72" />
          <rect x="532" y="72" width="36" height="58" />
          <rect x="578" y="82" width="22" height="48" />
        </g>

        {/* ======================================================== */}
        {/* Layer 4: Architectural Lit Windows                       */}
        {/* ======================================================== */}
        {/* Mint Windows (#94ffaf) */}
        <g fill="#94ffaf">
          <rect x="38" y="74" width="2" height="3" />
          <rect x="48" y="74" width="2" height="3" />
          <rect x="58" y="88" width="2" height="3" />
          <rect x="38" y="95" width="2" height="3" />
          <rect x="58" y="102" width="2" height="3" />

          <rect x="94" y="68" width="2" height="3" />
          <rect x="104" y="68" width="2" height="3" />
          <rect x="120" y="75" width="2" height="3" />
          <rect x="94" y="82" width="2" height="3" />
          <rect x="112" y="89" width="2" height="3" />
          <rect x="104" y="103" width="2" height="3" />
          <rect x="120" y="103" width="2" height="3" />

          <rect x="150" y="86" width="2" height="3" />
          <rect x="166" y="93" width="2" height="3" />
          <rect x="158" y="107" width="2" height="3" />

          <rect x="200" y="64" width="2" height="3" />
          <rect x="210" y="64" width="2" height="3" />
          <rect x="226" y="71" width="2" height="3" />
          <rect x="200" y="78" width="2" height="3" />
          <rect x="218" y="85" width="2" height="3" />
          <rect x="200" y="99" width="2" height="3" />
          <rect x="210" y="106" width="2" height="3" />

          <rect x="260" y="82" width="2" height="3" />
          <rect x="272" y="89" width="2" height="3" />
          <rect x="260" y="103" width="2" height="3" />

          <rect x="314" y="76" width="2" height="3" />
          <rect x="330" y="83" width="2" height="3" />
          <rect x="322" y="97" width="2" height="3" />
          <rect x="330" y="104" width="2" height="3" />

          <rect x="364" y="84" width="2" height="3" />
          <rect x="382" y="91" width="2" height="3" />
          <rect x="372" y="105" width="2" height="3" />

          <rect x="420" y="88" width="2" height="3" />
          <rect x="436" y="88" width="2" height="3" />
          <rect x="448" y="95" width="2" height="3" />
          <rect x="428" y="109" width="2" height="3" />

          <rect x="482" y="66" width="2" height="3" />
          <rect x="498" y="73" width="2" height="3" />
          <rect x="482" y="80" width="2" height="3" />
          <rect x="506" y="87" width="2" height="3" />
          <rect x="490" y="101" width="2" height="3" />

          <rect x="540" y="86" width="2" height="3" />
          <rect x="556" y="93" width="2" height="3" />
          <rect x="548" y="107" width="2" height="3" />
        </g>

        {/* Lime Windows (#eaff94) */}
        <g fill="#eaff94">
          <rect x="58" y="74" width="2" height="3" />
          <rect x="48" y="81" width="2" height="3" />
          <rect x="38" y="88" width="2" height="3" />
          <rect x="48" y="102" width="2" height="3" />

          <rect x="112" y="68" width="2" height="3" />
          <rect x="94" y="75" width="2" height="3" />
          <rect x="104" y="82" width="2" height="3" />
          <rect x="120" y="89" width="2" height="3" />
          <rect x="94" y="96" width="2" height="3" />
          <rect x="112" y="103" width="2" height="3" />

          <rect x="158" y="79" width="2" height="3" />
          <rect x="150" y="93" width="2" height="3" />
          <rect x="166" y="100" width="2" height="3" />

          <rect x="218" y="64" width="2" height="3" />
          <rect x="200" y="71" width="2" height="3" />
          <rect x="210" y="78" width="2" height="3" />
          <rect x="226" y="85" width="2" height="3" />
          <rect x="210" y="92" width="2" height="3" />
          <rect x="218" y="99" width="2" height="3" />
          <rect x="226" y="106" width="2" height="3" />

          <rect x="272" y="75" width="2" height="3" />
          <rect x="260" y="89" width="2" height="3" />
          <rect x="272" y="103" width="2" height="3" />

          <rect x="322" y="69" width="2" height="3" />
          <rect x="314" y="83" width="2" height="3" />
          <rect x="330" y="90" width="2" height="3" />
          <rect x="314" y="104" width="2" height="3" />

          <rect x="372" y="77" width="2" height="3" />
          <rect x="364" y="91" width="2" height="3" />
          <rect x="382" y="98" width="2" height="3" />
          <rect x="364" y="105" width="2" height="3" />

          <rect x="428" y="81" width="2" height="3" />
          <rect x="444" y="81" width="2" height="3" />
          <rect x="420" y="95" width="2" height="3" />
          <rect x="436" y="102" width="2" height="3" />

          <rect x="490" y="66" width="2" height="3" />
          <rect x="506" y="73" width="2" height="3" />
          <rect x="498" y="80" width="2" height="3" />
          <rect x="482" y="94" width="2" height="3" />
          <rect x="506" y="101" width="2" height="3" />

          <rect x="548" y="79" width="2" height="3" />
          <rect x="540" y="93" width="2" height="3" />
          <rect x="556" y="100" width="2" height="3" />
        </g>

        {/* ======================================================== */}
        {/* Layer 5: Pulsing Spire Aviation Beacons                  */}
        {/* ======================================================== */}
        <g>
          {/* Spire 1 Beacon */}
          <motion.rect
            x="43"
            y="35"
            width="2"
            height="2"
            fill="#eaff94"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Spire 2 Beacon */}
          <motion.rect
            x="212"
            y="21"
            width="2"
            height="2"
            fill="#94ffaf"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.8, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Spire 3 Needle Beacon */}
          <motion.rect
            x="371"
            y="25"
            width="2"
            height="2"
            fill="#eaff94"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, delay: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Spire 4 Tech Beacon */}
          <motion.rect
            x="493"
            y="25"
            width="2"
            height="2"
            fill="#94ffaf"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.6, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* ======================================================== */}
        {/* Layer 6: Flying Spaceships (Smooth Performant Motion)    */}
        {/* ======================================================== */}

        {/* Spaceship 1: High-Altitude Fast Scout (heading west / right to left) */}
        <motion.g
          animate={{
            x: [660, -50],
            y: [12, 15, 11, 14, 12],
          }}
          transition={{
            x: { duration: 18, repeat: Infinity, ease: "linear" },
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ willChange: "transform" }}
        >
          {/* Ship 2 sprite (10x5 pixels) */}
          {/* Outline */}
          <g className="fill-neutral-900 dark:fill-black">
            <rect x="3" y="0" width="3" height="1" />
            <rect x="1" y="1" width="2" height="1" />
            <rect x="5" y="1" width="3" height="1" />
            <rect x="0" y="2" width="1" height="1" />
            <rect x="2" y="2" width="1" height="1" />
            <rect x="8" y="2" width="1" height="1" />
            <rect x="1" y="3" width="2" height="1" />
            <rect x="5" y="3" width="3" height="1" />
            <rect x="3" y="4" width="3" height="1" />
          </g>
          {/* Hull (#94ffaf) */}
          <g fill="#94ffaf">
            <rect x="1" y="2" width="1" height="1" />
            <rect x="3" y="2" width="5" height="1" />
          </g>
          {/* Cockpit & Accents (#eaff94) */}
          <g fill="#eaff94">
            <rect x="3" y="1" width="2" height="1" />
            <rect x="3" y="3" width="2" height="1" />
          </g>
          {/* Pulsing Exhaust Trail */}
          <motion.rect
            x="9"
            y="2"
            width="3"
            height="1"
            fill="#eaff94"
            animate={{ scaleX: [0.6, 1.4, 0.6], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "9px 2.5px" }}
          />
        </motion.g>

        {/* Spaceship 2: Mid-Altitude Heavy Cruiser (heading east / left to right) */}
        <motion.g
          animate={{
            x: [-60, 660],
            y: [28, 25, 29, 26, 28],
          }}
          transition={{
            x: { duration: 15, delay: 2, repeat: Infinity, ease: "linear" },
            y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ willChange: "transform" }}
        >
          {/* Ship 1 sprite (14x7 pixels) */}
          {/* Outline */}
          <g className="fill-neutral-900 dark:fill-black">
            <rect x="8" y="0" width="3" height="1" />
            <rect x="3" y="1" width="5" height="1" />
            <rect x="11" y="1" width="1" height="1" />
            <rect x="1" y="2" width="2" height="1" />
            <rect x="10" y="2" width="1" height="1" />
            <rect x="12" y="2" width="2" height="1" />
            <rect x="2" y="3" width="1" height="1" />
            <rect x="11" y="3" width="1" height="1" />
            <rect x="13" y="3" width="1" height="1" />
            <rect x="1" y="4" width="2" height="1" />
            <rect x="10" y="4" width="1" height="1" />
            <rect x="12" y="4" width="2" height="1" />
            <rect x="3" y="5" width="5" height="1" />
            <rect x="11" y="5" width="1" height="1" />
            <rect x="8" y="6" width="3" height="1" />
          </g>
          {/* Hull (#94ffaf) */}
          <g fill="#94ffaf">
            <rect x="3" y="2" width="6" height="1" />
            <rect x="11" y="2" width="1" height="1" />
            <rect x="3" y="3" width="7" height="1" />
            <rect x="12" y="3" width="1" height="1" />
            <rect x="3" y="4" width="6" height="1" />
            <rect x="11" y="4" width="1" height="1" />
          </g>
          {/* Cockpit Canopy (#eaff94) */}
          <g fill="#eaff94">
            <rect x="8" y="1" width="3" height="1" />
            <rect x="9" y="2" width="1" height="1" />
            <rect x="10" y="3" width="1" height="1" />
            <rect x="9" y="4" width="1" height="1" />
            <rect x="8" y="5" width="3" height="1" />
          </g>
          {/* Animated Twin Thruster Exhaust */}
          <motion.g
            animate={{
              scaleX: [0.75, 1.35, 0.75],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "2px 3.5px" }}
          >
            <rect x="0" y="3" width="2" height="1" fill="#eaff94" />
            <rect x="1" y="2" width="1" height="1" fill="#94ffaf" />
            <rect x="1" y="4" width="1" height="1" fill="#94ffaf" />
          </motion.g>
        </motion.g>

        {/* Spaceship 3: Rooftop VTOL Hovercraft (Patrolling over the Helipad Complex) */}
        <motion.g
          animate={{
            x: [424, 432, 424],
            y: [50, 45, 50],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
        >
          {/* VTOL Speeder Sprite (9x6 pixels) */}
          {/* Outline */}
          <g className="fill-neutral-900 dark:fill-black">
            <rect x="3" y="0" width="3" height="1" />
            <rect x="2" y="1" width="1" height="1" />
            <rect x="6" y="1" width="1" height="1" />
            <rect x="1" y="2" width="1" height="1" />
            <rect x="7" y="2" width="1" height="1" />
            <rect x="0" y="3" width="2" height="1" />
            <rect x="4" y="3" width="1" height="1" />
            <rect x="7" y="3" width="2" height="1" />
            <rect x="1" y="4" width="2" height="1" />
            <rect x="6" y="4" width="2" height="1" />
          </g>
          {/* Hull (#94ffaf) */}
          <g fill="#94ffaf">
            <rect x="2" y="2" width="5" height="1" />
            <rect x="2" y="3" width="1" height="1" />
            <rect x="6" y="3" width="1" height="1" />
            <rect x="3" y="4" width="3" height="1" />
          </g>
          {/* Cockpit Canopy (#eaff94) */}
          <g fill="#eaff94">
            <rect x="3" y="1" width="3" height="1" />
            <rect x="3" y="3" width="1" height="1" />
            <rect x="5" y="3" width="1" height="1" />
          </g>
          {/* Animated Downward VTOL Thruster Jets */}
          <motion.g
            animate={{
              scaleY: [0.75, 1.4, 0.75],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.45,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "4.5px 5px" }}
          >
            <rect x="2" y="5" width="2" height="2" fill="#eaff94" />
            <rect x="5" y="5" width="2" height="2" fill="#eaff94" />
            <rect x="2" y="7" width="1" height="1" fill="#94ffaf" />
            <rect x="6" y="7" width="1" height="1" fill="#94ffaf" />
          </motion.g>
        </motion.g>

        {/* Spaceship 4: Quick Low-Flyer Interceptor (heading east) */}
        <motion.g
          animate={{
            x: [-40, 660],
            y: [38, 41, 39, 38],
          }}
          transition={{
            x: { duration: 11, delay: 6.5, repeat: Infinity, ease: "linear" },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ willChange: "transform" }}
        >
          {/* Mini Interceptor (7x3 pixels) */}
          <g className="fill-neutral-900 dark:fill-black">
            <rect x="1" y="0" width="3" height="1" />
            <rect x="0" y="1" width="1" height="1" />
            <rect x="6" y="1" width="1" height="1" />
            <rect x="1" y="2" width="3" height="1" />
          </g>
          <g fill="#94ffaf">
            <rect x="1" y="1" width="4" height="1" />
          </g>
          <g fill="#eaff94">
            <rect x="4" y="0" width="1" height="1" />
            <rect x="5" y="1" width="1" height="1" />
            <rect x="4" y="2" width="1" height="1" />
          </g>
          <motion.rect
            x="0"
            y="1"
            width="2"
            height="1"
            fill="#eaff94"
            animate={{ scaleX: [0.6, 1.5, 0.6], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "0px 1.5px" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
