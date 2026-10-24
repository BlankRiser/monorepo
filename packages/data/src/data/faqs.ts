export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Array<FAQItem> = [
  {
    id: "project-types",
    question: "What types of websites and applications can you build?",
    answer:
      "I build full-stack digital products across the spectrum: personal and portfolio websites, brand showcases, high-converting product pages, comprehensive SaaS applications, data-heavy dashboards with real-time visualization, and cross-platform mobile apps using React Native. Whether you need a 0-to-1 MVP or a major upgrade to an existing app, I can help.",
  },
  {
    id: "pricing-structure",
    question: "How do you structure pricing and engagements?",
    answer:
      "I primarily offer two engagement models: fixed-price quotes for well-scoped projects (such as marketing websites, MVPs, or stack migrations), and milestone-based sprint retainers for ongoing product engineering and embedded development. Both models provide transparent costs without hidden fees.",
  },
  {
    id: "project-timeline",
    question: "How long does a typical project take from start to finish?",
    answer:
      "A tailored portfolio or landing page typically ships within 1 to 2 weeks. A production-ready MVP or feature-rich SaaS application usually takes between 3 to 6 weeks, depending on authentication requirements, database complexity, and third-party API integrations.",
  },
  {
    id: "existing-codebase",
    question: "Can you work with an existing codebase or lead a migration?",
    answer:
      "Yes. I frequently step into existing projects to untangle tech debt, modernize outdated frameworks (such as migrating to Next.js App Router or TanStack Start), improve Core Web Vitals and Lighthouse scores, set up automated CI/CD pipelines, and introduce strict TypeScript type safety.",
  },
  {
    id: "communication-workflow",
    question: "How do we collaborate and communicate throughout the project?",
    answer:
      "I prioritize an async-first workflow to keep progress fast and uninterrupted. You'll receive live preview deployments for every sprint milestone, accompanied by short Loom video walkthroughs and updates via Slack, Discord, or email. We can also schedule live video checkpoints whenever strategic alignment is needed.",
  },
  {
    id: "post-launch-handover",
    question: "What happens after the product is launched?",
    answer:
      "Every project includes a post-launch warranty period during which any unexpected bugs or minor adjustments are addressed promptly at no extra charge. You receive full ownership of all repositories, accounts, and documentation. I also offer ongoing maintenance retainers for continuous feature iterations.",
  },
];
