"use client";

import { Heatmap, LiquidMetal } from "@paper-design/shaders-react";
import { GithubIcon } from "@workspace/ui/icons/github-icon";
import { LinkedinIcon } from "@workspace/ui/icons/linkedin-icon";
import { MailIcon } from "@workspace/ui/icons/mail-icon";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

type HeroProps = React.ComponentProps<"section">;

export const Hero = (props: HeroProps) => {
  return (
    <section
      {...props}
      className={cn(["flex flex-col gap-4", props.className])}
    >
      <div className="flex flex-col gap-2">
        <LiquidMetal
          width={100}
          height={100}
          image="/devhaven-logo.svg"
          colorBack="#0a0a0a"
          colorTint="#ffffff"
          shape="daisy"
          repetition={2}
          softness={0.1}
          shiftRed={0.1}
          shiftBlue={0.1}
          distortion={0.07}
          contour={0.4}
          angle={70}
          speed={0.75}
          scale={0.6}
          fit="contain"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 className="text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
            Ram Shankar Choudhary
          </motion.h1>
          <motion.span className="text-base text-neutral-400 dark:text-neutral-600">
            {
              "/\u0072\u00E6\u006D \u0283\u00E6\u006E\u006B\u00E6\u0072 \u0074\u0283\u0252\u028C\u0064\u0068\u00E6\u0072\u0079/"
            }
          </motion.span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col gap-1 text-lg text-neutral-600 dark:text-neutral-400 sm:flex-row sm:items-center sm:gap-4"
      >
        <span>Full Stack Developer</span>
        <span className="hidden text-neutral-700 sm:inline">•</span>
        <span>Based in India</span>
      </motion.div>
      <SocialBadges />
    </section>
  );
};

const social = [
  {
    label: "Github",
    type: "url",
    url: "https://github.com/blankriser",
    icon: <GithubIcon />,
  },
  {
    label: "LinkedIn",
    type: "url",
    url: "https://linkedin.com/in/ram-shankar-choudhary",
    icon: <LinkedinIcon />,
  },
  {
    label: "Mail",
    type: "mail",
    url: "mailto:ramshankarcodes@gmail.com",
    icon: <MailIcon />,
  },
];

const SocialBadges = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: 0.1,
      }}
      className="flex gap-2"
    >
      {social.map((s) => {
        return (
          <motion.a
            key={s.label}
            href={s.url}
            className={cn([
              "px-2.5 py-1.5 rounded-full flex gap-2 items-center",
              "bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-200 transition-colors duration-200 ease-in-out",
              "dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-800",
            ])}
            target={s.type === "url" ? "_blank" : "_self"}
            rel={s.type === "url" ? "noopener noreferrer" : undefined}
          >
            {s.icon}
            <span className="hidden md:inline">{s.label}</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
};
