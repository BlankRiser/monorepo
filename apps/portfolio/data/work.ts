import { cn } from "@workspace/ui/lib/utils";

type Work = {
  year: number;
  role: string;
  slug: string;
  position: string;
  tags: Array<string>;
  company: string;
  description: string;
  url: string;
  image: string;
  technologies: Array<string>;
  brandClasses: string;
  accomplishments?: Array<string>;
  keyDetails?: Array<string>;
};

export const works: Array<Work> = [
  {
    year: 2023,
    slug: "ar-genie",
    role: "Frontend Developer",
    position: "Freelance",
    tags: [],
    company: "AR Genie",
    description: `Assisting in development of a platform for AR based applications.`,
    keyDetails: [""],
    url: "https://www.argenie.ai/?ref=ram.codes",
    image: "/images/work/ar-genie.png",
    technologies: [
      "vite",
      "material-ui",
      "tailwind",
      "javascript",
      "typescript",
      "react-query",
      "graphql",
      "zod",
    ],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow  --hover:shadow-attri"
    ),
  },
  {
    year: 2023,
    slug: "attri-ai",
    role: "Frontend Developer",
    position: "FTE",
    tags: ["Agency"],
    company: "Attri.AI",
    description: `Developing performant and Secure applications.`,
    keyDetails: [
      "Developing map based application for meterological data",
      "Part of hiring frontend team",
    ],
    url: "https://attri.ai/?ref=ram.codes",
    image: "/images/work/attri.png",
    technologies: [
      "vite",
      "mapbox",
      "tailwind",
      "typescript",
      "material-ui",
      "radix-ui",
      "echarts",
      "react-query",
      "javascript",
      "zod",
    ],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow  --hover:shadow-attri"
    ),
  },
  {
    year: 2023,
    slug: "studio-rhaya",
    role: "Frontend Developer",
    position: "Freelance",
    tags: ["Architecture"],
    company: "Studio Rhaya",
    description: `Building a portfolio website for a design studio.`,
    keyDetails: ["Developed a portfolio website for the company"],
    url: "https://studiorhaya.com/?ref=ram.codes",
    image: "/images/work/rhaya.png",
    technologies: ["next", "tailwind", "typescript", "framer-motion"],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow  --hover:shadow-attri"
    ),
  },
  {
    year: 2022,
    slug: "midas-fintech-solutions",
    role: "Frontend Developer",
    position: "FTE",
    tags: ["Financial Services"],
    company: "Midas Fintech Solutions Pvt Ltd",
    description: `Developing performant and Secure NextJs apps for fintech needs.`,
    keyDetails: [
      "Developed internal tools that helped the company to scale",
      "Developed customer facing applications that helped company to acquire more customers",
      "Developed a design system for the company",
    ],
    url: "https://midasfintechsolutions.com?=ram.codes",
    image: "/images/work/midas.png",
    technologies: [
      "vite",
      "framer-motion",
      "react",
      "tailwind",
      "typescript",
      "react-hook-form",
      "swr",
      "react-query",
      "zod",
      "nginx",
    ],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow --hover:shadow-midas"
    ),
  },
  {
    year: 2022,
    slug: "potion-inc",
    role: "Frontend Developer",
    position: "Freelance",
    tags: [
      "E-commerce",
      "Cosmetics & Personal Care Industry",
      "Front-end development",
      "Back-end development",
      "Hosting",
      "DNS Management",
      "Payment Gateway Integration",
    ],
    company: "Potion Inc",
    description: `Developed an e-commerce platform for international customers.`,
    url: "https://potion-inc.io/?ref=ram.codes",
    image: "/images/work/potion.png",
    technologies: [
      "framer-motion",
      "next",
      "tailwind",
      "typescript",
      "zod",
      "stripe",
    ],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow --hover:shadow-potion"
    ),
  },
  {
    year: 2021,
    slug: "opsopod",
    role: "Frontend Developer",
    position: "Freelance",
    tags: [],
    company: "Opsopod",
    description: `Built an IoT platform landing page.`,
    url: "https://www.opspod.in/?ref=ram.codes",
    image: "/images/work/opspod.png",
    technologies: ["next", "tailwind", "framer-motion", "typescript"],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow --hover:shadow-cosmic-zoom"
    ),
  },
  {
    year: 2021,
    slug: "cosmic-zoom",
    role: "Frontend Developer",
    position: "Freelance",
    tags: [],
    company: "CosmicZoom.in",
    description: `Developed an e-commerce platform to international customers.`,
    url: "https://potion-inc.io/?ref=ram.codes",
    image: "/images/work/cosmic-zoom.png",
    technologies: [
      "create-react-app",
      "tailwind",
      "framer-motion",
      "nginx",
      "google-drive-api",
    ],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow --hover:shadow-cosmic-zoom"
    ),
  },
  {
    year: 2021,
    slug: "nabler",
    role: "Data Engineer",
    position: "FTE",
    tags: [],
    company: "Nabler Web Solutions Pvt Ltd",
    description: `Built ETL pipelines and dashboards using Amazon Quicksight.`,
    url: "https://potion-inc.io/?ref=ram.codes",
    image: "/images/work/nabler.png",
    technologies: [
      "python",
      "aws",
      "postgres-sql",
      "simple storage service (s3)",
      "elastic cloud compute (ec2)",
      "nginx",
    ],
    brandClasses: cn(
      "bg-neutral-950 --border --border-neutral-700 transition-shadow --hover:shadow-nabler"
    ),
  },
];
