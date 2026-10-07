import path from "node:path";
import url from "node:url";
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackRouter({
      autoCodeSplitting: true,
    }),
    viteReact(),
  ],
  build: isSsrBuild
    ? {
        // SSR build configuration
        ssr: true,
        outDir: "dist/server",
        emitAssets: true,
        copyPublicDir: false,
        rolldownOptions: {
          input: path.resolve(__dirname, "src/entry-server.tsx"),
          output: {
            entryFileNames: "[name].js",
            chunkFileNames: "assets/[name]-[hash].js",
            assetFileNames: "assets/[name]-[hash][extname]",
          },
        },
      }
    : {
        // Client build configuration
        outDir: "dist/client",
        emitAssets: true,
        copyPublicDir: true,
        rolldownOptions: {
          input: path.resolve(__dirname, "src/entry-client.tsx"),
          output: {
            entryFileNames: "[name].js",
            chunkFileNames: "assets/[name]-[hash].js",
            assetFileNames: "assets/[name]-[hash][extname]",
          },
        },
      },
  ssr: {
    optimizeDeps: {
      include: ["@tanstack/react-router/ssr/server"],
    },
  },
}));
