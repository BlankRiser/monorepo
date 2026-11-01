import { buttonVariants } from "@workspace/ui/components/button";
import { ArrowUpRight, Clock3, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ram Shankar Choudhary about product engineering, consulting, or a project.",
};

const email = "ramshankar.codes@gmail.com";
const mailto = `mailto:${email}?subject=Hello%20Ram`;
const socials = [
  {
    platform: "LinkedIn",
    username: "ram-shankar-choudhary",
    link: "https://www.linkedin.com/in/ram-shankar-choudhary/",
  },
  {
    platform: "GitHub",
    username: "@BlankRiser",
    link: "https://github.com/blankriser",
  },
  {
    platform: "X",
    username: "@Blank_Riser",
    link: "https://x.com/Blank_Riser",
  },
  {
    platform: "Bluesky",
    username: "@otheos.bsky.social",
    link: "https://bsky.app/profile/otheos.bsky.social",
  },
];

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-12 md:pt-20">
      <header className="grid gap-10 md:grid-cols-[1.4fr_0.6fr] md:items-end md:gap-16">
        <div>
          <p className="mb-5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Contact
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-neutral-50">
            Let’s start with what you’re trying to make possible.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-300">
            If you’re building a product, working through a technical problem,
            or looking for an engineering partner, send me a note. A little
            context helps me give you a useful reply.
          </p>
        </div>
        <div className="border-t border-neutral-200 pt-5 md:border-t-0 md:border-l md:pl-7 md:pt-0 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Best way to reach me
          </p>
          <a
            href={mailto}
            className="mt-2 inline-flex items-center gap-2 break-all text-base font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:text-neutral-50 dark:decoration-neutral-700"
          >
            {email}
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
          <a
            href={mailto}
            className={`${buttonVariants({ variant: "default", size: "lg" })} mt-6`}
          >
            <Mail className="size-4" aria-hidden="true" />
            Write an email
          </a>
        </div>
      </header>

      <section className="mt-24 grid gap-10 border-t border-neutral-200 pt-8 md:grid-cols-[minmax(150px,0.7fr)_1.3fr] md:gap-16 dark:border-neutral-800">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            01 / A useful first note
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
            What are you working on?
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-[15px] leading-7 text-neutral-600 dark:text-neutral-300">
            Tell me a little about the goal, what you’ve tried so far, and any
            timing or constraints I should know about. It doesn’t need to be a
            polished brief. A few honest sentences are enough to get started.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              Bengaluru, India
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4" aria-hidden="true" />
              India Standard Time (UTC+5:30)
            </span>
          </div>
        </div>
      </section>

      <section className="mt-20 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <div className="grid gap-8 md:grid-cols-[minmax(150px,0.7fr)_1.3fr] md:gap-16">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              02 / Elsewhere
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Find me online
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-neutral-200 py-4 text-sm text-neutral-700 transition-colors hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-50"
              >
                <span>
                  <span className="block font-medium">{social.platform}</span>
                  <span className="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-400">
                    {social.username}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-neutral-500"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
