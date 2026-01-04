"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { projects, socials, otherLinks } from "./footer";
import { DevHavenLogo } from "@workspace/ui/icons/devhaven-logo";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-4 backdrop-blur-md bg-white/50 dark:bg-black/50 border-b border-black/5 dark:border-white/5"
      >
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            <DevHavenLogo className=" size-8" />
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                  pathname === link.href
                    ? "text-black dark:text-white"
                    : "text-neutral-500"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 -mr-2 text-neutral-800 dark:text-neutral-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 bg-white/80 dark:bg-black/80 backdrop-blur-xl sm:hidden"
          >
            <div className="flex flex-col gap-8 h-full overflow-y-auto pb-10">
              {/* Main Links */}
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 w-full my-2" />
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Projects
                </h3>
                {projects.slice(0, 5).map((p, i) => (
                  <motion.a
                    key={p.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-neutral-700 dark:text-neutral-300"
                  >
                    {p.label}
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Other
                </h3>
                {otherLinks.map((l, i) => (
                  <motion.a
                    key={l.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-neutral-700 dark:text-neutral-300"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Socials
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.platform}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-full px-3 py-1"
                    >
                      {s.platform}
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <a
                  href="https://bio.ram.codes/resume"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium"
                >
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
