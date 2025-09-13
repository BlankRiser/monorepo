import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

const about = {
  name: "Ram Shankar",
  title: "Software Engineer",
  proficiencies: [
    {
      label: "Full Stack",
      skills: ["Next.js", "Astro", "TRPC", "ORPC"],
      description:
        "Creating end-to-end web applications with seamless integration between frontend and backend.",
    },
    {
      label: "Frontend",
      skills: [
        "React",
        "Next.js",
        "Astro",
        "TailwindCSS",
        "Radix UI",
        "Base UI",
        "Framer Motion",
        "GSAP",
        "Three.js",
        "React Three Fiber",
      ],
      description:
        "Building responsive and interactive user interfaces with modern frameworks.",
    },
    {
      label: "Backend",
      skills: [
        "Node.js",
        "Nest.js",
        "Express",
        "Deno",
        "Bun",
        "Elysia",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Drizzle ORM",
        "Prisma",
      ],
      description:
        "Building robust and scalable server-side applications with modern technologies.",
    },
  ],
  socials: {
    portfolio: "https://ram.codes",
    github: "https://github.com/blankriser",
    linkedin: "https://www.linkedin.com/in/ram-shankar-choudhary",
    twitter: "https://twitter.com/blankriser",
    resume: "",
  },
};

export const ProfileCard = () => {
  return (
    <div className=" w-full md:max-w-lg h-full md:h-[90dvh] ">
      <div className="md:rounded-3xl flex flex-col overflow-hidden ">
        <div className="relative [background-image:url(/assets/ram.webp)] bg-cover bg-no-repeat bg-center md:bg-top bg-blue-950 color-blue-950 aspect-square">
          <div className="absolute bottom-0 flex flex-col justify-end h-full w-full p-4 text-blue-50 bg-[linear-gradient(0deg,var(--color-blue-950)_0%,rgba(45,222,253,0.04)_60%)]">
            <h1
              className="text-7xl"
              style={{
                fontFamily: "Instrument Serif",
              }}
            >
              {about.name}
            </h1>
            <span
              style={{
                fontFamily: "Instrument sans",
              }}
            >
              {about.title}
            </span>
          </div>
        </div>
        <div className="bg-blue-950 flex flex-col gap-4 p-4">
          <Proficiencies />
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

const Proficiencies = () => {
  return (
    <div className="flex gap-2">
      {about.proficiencies.map((prof, index) => {
        if (!prof.label) return null;
        return (
          <Dialog key={index}>
            <DialogTrigger className="text-blue-950 whitespace-nowrap bg-orange-200 hover:bg-blue-200 px-4 py-1.5 text-xs rounded-full text-center font-sans">
              {prof.label}
            </DialogTrigger>
            <DialogContent className="bg-orange-200">
              <DialogHeader>
                <DialogTitle className="font-serif text-4xl font-normal text-blue-950">
                  {prof.label}
                </DialogTitle>
                <DialogDescription className="text-blue-950">
                  {prof.description}
                </DialogDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {prof.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-950 text-orange-50 px-3 py-1 rounded-full text-sm font-sans"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </DialogHeader>
              <DialogTrigger className="mt-8 border-2 border-blue-950 hover:bg-blue-950 text-blue-950 hover:text-orange-50 whitespace-nowrap px-2 py-4 rounded-full text-center font-sans transition-colors">
                Close
              </DialogTrigger>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(about.socials).map(([key, value]) => {
        if (!value) return null;
        return (
          <a
            key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-blue-950 px-2 py-4 bg-orange-200 hover:bg-blue-200 rounded-full text-center text-4xl "
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        );
      })}
    </div>
  );
};
