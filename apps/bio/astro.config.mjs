// @ts-check

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pdf from "astro-pdf";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    process.env.NODE_ENV === 'development' && pdf({
      pages: {
        "/resume": [
          {
            path: "/ram_resume.pdf",
            ensurePath: true,
            throwOnFail: true,
            pdf: {
              margin: {
                top: '16px',
                bottom: '16px',
              },
              timeout: 10_000,
            },
            callback: async (page) => {
              const title = "Ram Shankar Choudhary";
              await page.evaluate((title) => (document.title = title), title);
            },
          },
        ],
      },
    }),
  ],
});
