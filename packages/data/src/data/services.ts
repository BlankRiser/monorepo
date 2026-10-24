export type ServiceItem = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  highlights: Array<string>;
  technologies: Array<string>;
};

export const services: Array<ServiceItem> = [
  {
    id: "web-development",
    title: "Web & Digital Product Development",
    shortDescription:
      "Bespoke websites, brand/product pages, portfolios, and full-stack SaaS applications.",
    description:
      "Crafting high-impact websites and modern web applications tailored to your business goals. From engaging portfolio showcases and high-converting product pages to complex multi-tenant SaaS platforms with fluid UX, responsive layouts, and rock-solid code quality.",
    highlights: [
      "Portfolio & personal websites",
      "Brand showcase & high-converting product landing pages",
      "End-to-end SaaS applications",
      "Responsive, accessible & mobile-first design",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    id: "mvp-startups",
    title: "MVPs & Startup Fast-Track",
    shortDescription:
      "Taking your 0-to-1 idea from concept to launch in weeks, not months.",
    description:
      "Helping founders validate hypotheses and reach market velocity rapidly. I architect and build production-ready MVPs with scalable foundations, intuitive user flows, and secure architecture that grows with your users without technical debt.",
    highlights: [
      "0-to-1 rapid prototyping & validation",
      "Production-ready MVP development in 2-4 weeks",
      "Scalable foundational architecture",
      "Authentication, billing & analytics baked in",
    ],
    technologies: ["Next.js", "React", "Supabase", "PostgreSQL", "Stripe"],
  },
  {
    id: "mobile-apps",
    title: "Cross-Platform Mobile Apps",
    shortDescription:
      "Smooth, native iOS & Android applications built with React Native.",
    description:
      "Delivering high-performance mobile experiences with shared logic between web and mobile platforms. Utilizing React Native and modern native modules to achieve 60 FPS performance, offline-first capabilities, and delightful tactile micro-interactions.",
    highlights: [
      "Cross-platform iOS & Android apps",
      "Shared business logic & API layer with web",
      "Offline sync & device hardware integration",
      "App Store & Google Play deployment readiness",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Tailwind / NativeWind"],
  },
  {
    id: "modern-stack-migration",
    title: "Modern Stack Migrations",
    shortDescription:
      "Upgrading legacy codebases to Next.js, TanStack Start, and React 19.",
    description:
      "Transforming monolithic, brittle, or slow legacy applications into modern, type-safe architectures. Seamless migrations to Next.js App Router, TanStack Start, or Vite, plus modular Turborepo monorepos for maximum developer velocity and maintainability.",
    highlights: [
      "Migration to Next.js App Router & TanStack Start",
      "React 19 & Server Components adoption",
      "Turborepo monorepo consolidation",
      "Zero-downtime, staged migration paths",
    ],
    technologies: [
      "Next.js",
      "TanStack Start",
      "React 19",
      "Turborepo",
      "TypeScript",
    ],
  },
  {
    id: "ai-integrations",
    title: "AI Integrations & LLM Features",
    shortDescription:
      "Supercharging products with intelligent agents, tool-calling, and custom AI flows.",
    description:
      "Integrating cutting-edge AI capabilities into user-facing products. From streaming chat interfaces and intelligent multi-step agents to retrieval-augmented generation (RAG), structured JSON outputs, embeddings, and automated workflow triggers.",
    highlights: [
      "LLM tool-calling & structured JSON pipelines",
      "Streaming chat & generative UI experiences",
      "Vector embeddings & semantic search",
      "OpenAI, Anthropic & Gemini API integrations",
    ],
    technologies: ["OpenAI", "Anthropic", "Vercel AI SDK", "Embeddings", "LangChain"],
  },
  {
    id: "apis-integrations",
    title: "APIs & Third-Party Integrations",
    shortDescription:
      "Seamless connectivity for payments, auth, headless CMS, and external services.",
    description:
      "Connecting your platform with the broader software ecosystem. Architecting robust, type-safe REST and GraphQL APIs, webhooks, payment checkouts with Stripe, secure authentication systems, and headless content management integrations.",
    highlights: [
      "Stripe payment gateways, subscriptions & checkout",
      "Secure auth (OAuth, Passkeys, Better-Auth, NextAuth)",
      "Headless CMS (Sanity, Contentful, Strapi) setups",
      "Custom webhook processing & background workers",
    ],
    technologies: ["Stripe", "GraphQL", "REST", "OAuth", "Webhooks"],
  },
  {
    id: "dashboards-visualization",
    title: "Dashboards & Data Visualization",
    shortDescription:
      "Real-time telemetry, interactive charting, and complex geospatial viewers.",
    description:
      "Transforming dense data into intuitive, lightning-fast visual dashboards. Specializing in high-frequency data streams, interactive charting with ECharts, and map-based geospatial viewers (such as Mapbox meteorological and location applications).",
    highlights: [
      "Real-time data feeds & interactive analytics",
      "ECharts & custom SVG data visualizations",
      "Mapbox & geospatial mapping applications",
      "Zero-latency filtering of large datasets",
    ],
    technologies: ["Mapbox", "ECharts", "D3 / SVG", "WebSockets", "React Query"],
  },
  {
    id: "backend-cloud",
    title: "Backend & Cloud Infrastructure",
    shortDescription:
      "Reliable database schemas, cloud infrastructure, and microservices.",
    description:
      "Designing resilient server architectures and database schemas that perform effortlessly under load. Proficient in Node.js, Go, and Python, containerization with Docker, and cloud deployments across AWS (S3, EC2, CloudFront) and modern edge networks.",
    highlights: [
      "Relational database modeling with PostgreSQL",
      "AWS cloud architecture (S3, EC2, CloudFront)",
      "Docker containerization & reverse proxies (Nginx)",
      "Serverless & edge runtime deployments",
    ],
    technologies: ["PostgreSQL", "Node.js", "Go", "AWS", "Docker", "Nginx"],
  },
  {
    id: "workflow-automation-cicd",
    title: "Workflow Automation & CI/CD",
    shortDescription:
      "Automating testing, releases, and development pipelines to ship with confidence.",
    description:
      "Eliminating repetitive operational overhead by setting up continuous integration and continuous deployment pipelines. Automated test runs, automated preview deployments for pull requests, linting, and branch protection strategies.",
    highlights: [
      "Automated GitHub Actions CI/CD pipelines",
      "Preview deployment environments per PR",
      "Automated linting, typechecking & testing",
      "Automated semantic releases and changelogs",
    ],
    technologies: ["GitHub Actions", "Docker", "Turborepo", "CI/CD", "Bash"],
  },
  {
    id: "performance-code-quality",
    title: "Performance & Code Quality",
    shortDescription:
      "Sub-second loading, Core Web Vitals 100s, and rock-solid TypeScript safety.",
    description:
      "Auditing and supercharging frontend performance. Diagnosing bundle size bloat, eliminating hydration mismatch, optimizing Largest Contentful Paint (LCP) and INP, and refactoring loose types into strict, self-documenting TypeScript codebases.",
    highlights: [
      "Core Web Vitals & Lighthouse 100 tuning",
      "Bundle size optimization & code splitting",
      "Strict TypeScript types without 'any'",
      "SSR / RSC hydration safety & image optimization",
    ],
    technologies: ["Lighthouse", "Core Web Vitals", "TypeScript", "Next.js RSC", "Knip"],
  },
];
