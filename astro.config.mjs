import { defineConfig } from "vite";

import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://lab.guilherssousa.dev/",
  integrations: [tailwind(), svelte()],
  experimental: {
    viewTransitions: true,
  },
});
