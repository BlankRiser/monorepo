const about = {
  name: "Ram Shankar",
  title: "Software Engineer",
  proficiencies: [
    {
      label: "Frontend",
      skills: ["React", "Vue", "Svelte", "Astro", "TailwindCSS", "Three.js"],
      description:
        "Building responsive and interactive user interfaces with modern frameworks.",
    },
    {},
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
    <div className="bg-blue-950 md:rounded-3xl overflow-hidden shadow shadow-blue-950 w-full md:max-w-lg h-dvh md:h-[90dvh] flex flex-col">
      <div className="relative [background-image:url(./assets/ram.webp)] bg-cover bg-no-repeat bg-center md:bg-top bg-blue-950 color-blue-950 h-full">
        <div
          className="absolute bottom-0 flex flex-col justify-end h-full w-full p-4 text-blue-50 bg-[linear-gradient(0deg,var(--color-blue-950)_0%,rgba(45,222,253,0.04)_60%)]"
          style={
            {
              // background: `linear-gradient(0deg,var(--color-blue-950) 0%, rgba(45, 222, 253, 0.04) 60%);`,
            }
          }
        >
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
      <div className="bg-blue-950 p-4">
        <SocialLinks />
      </div>
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
            className="text-blue-950 px-2 py-4 bg-orange-200 hover:bg-blue-200 rounded-full text-center text-4xl"
            style={{
              fontFamily: "Instrument Serif",
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        );
      })}
    </div>
  );
};
