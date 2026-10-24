export type ProcessStep = {
  step: string;
  title: string;
  summary: string;
  description: string;
  activities: Array<string>;
};

export const workProcessSteps: Array<ProcessStep> = [
  {
    step: "01",
    title: "Discovery & Architecture",
    summary: "Aligning on goals, technical scope, and milestone roadmap.",
    description:
      "We begin by unpacking your product vision, target audience, and key deliverables. I evaluate technical trade-offs, select the optimal stack (Next.js, React Native, TanStack, etc.), and map out a transparent development roadmap with clearly phased milestones.",
    activities: [
      "Requirements discovery & technical feasibility check",
      "Stack selection & high-level system architecture",
      "Project scope breakdown with deliverable milestones",
    ],
  },
  {
    step: "02",
    title: "Rapid Prototyping & System Setup",
    summary: "Establishing design tokens, data models, and early interactive UI.",
    description:
      "Before full-scale buildout, I initialize the repository, configure tooling, define database schemas, and create interactive UI prototypes. This lets you experience the look, feel, and ergonomics early, validating design and user flows before writing backend logic.",
    activities: [
      "Tailwind design tokens & core component library",
      "Database schema & API contract design",
      "Clickable UI prototype for validation",
    ],
  },
  {
    step: "03",
    title: "Iterative Sprints & Live Previews",
    summary: "Shipping in focused sprint cycles with continuous preview deployments.",
    description:
      "Development moves forward in transparent, fast-paced iterations. Every feature branch is automatically built and deployed to a live staging environment for you to test in real-time. Continuous communication via async demos (Loom/Slack) ensures zero surprises.",
    activities: [
      "Modular, feature-by-feature development",
      "Automated live preview links for each sprint milestone",
      "Transparent async updates, video walkthroughs, and feedback loops",
    ],
  },
  {
    step: "04",
    title: "Testing, Launch & Warranty Support",
    summary: "Rigorous QA, zero-downtime deployment, and post-launch peace of mind.",
    description:
      "Prior to production release, the product undergoes end-to-end testing, cross-device QA, Core Web Vitals tuning, and SEO checks. After a smooth zero-downtime launch, you receive complete documentation, codebase handoff, and a dedicated warranty support window.",
    activities: [
      "Cross-browser, mobile & Core Web Vitals performance tuning",
      "Production deployment, custom domains & DNS configuration",
      "Clean codebase handoff, docs & post-launch warranty support",
    ],
  },
];
