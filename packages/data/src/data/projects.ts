export const projects = [
  {
    label: "Mausam",
    description: "A weather application with a clean interface",
    url: "https://mausam.ram.codes/",
    github: "https://github.com/BlankRiser/mausam",
  },
  {
    label: "Unit Conversion SDK",
    description: "NPM package for unit conversions",
    url: "https://www.npmjs.com/package/@devhaven/unit-conversion",
    github: "https://github.com/BlankRiser/unit-conversion",
  },
  {
    label: "Synoptic SDK",
    description: "SDK for synoptic data APIs",
    url: "https://www.npmjs.com/package/@devhaven/synoptic-sdk",
    github: "https://github.com/BlankRiser/synoptic-sdk",
  },
  {
    label: "Games",
    description: "Collection of browser-based games",
    url: "https://games.ram.codes/",
    github: "https://github.com/BlankRiser/devhaven-games",
  },
  {
    label: "UI",
    description: "Personal UI component library",
    url: "https://ui.ram.codes",
    github: "https://github.com/BlankRiser/ui.ram.codes",
  },
  {
    label: "Devhaven Theme",
    description: "VS Code theme extension",
    url: "https://marketplace.visualstudio.com/items?itemName=DevHaven.devhaven",
    github: "https://github.com/BlankRiser/DevHaven",
  },
];

export type Project = (typeof projects)[number];
