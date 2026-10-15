import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Stack principal: TanStack Start (SSR del framework, sin server custom).
// El setup SSR custom (server.js, entries, split de builds) quedó aparcado:
// ver sección "SSR setup" en AGENTS.md para re-adoptarlo.
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tailwindcss(), tanstackStart(), viteReact()],
});
