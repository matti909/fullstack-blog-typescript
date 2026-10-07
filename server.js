// server.js
import path from "node:path";
import express from "express";
import compression from "compression";

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  hmrPort = process.env.VITE_DEV_SERVER_PORT,
) {
  const app = express();

  let vite;
  if (!isProd) {
    // Development mode with Vite middleware
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    app.use(compression());
    app.use(express.static("./dist/client"));
  }

  // Sin path: catch-all sin pasar por path-to-regexp
  // (Express 5 rechaza app.use("*")).
  app.use(async (req, res) => {
    try {
      const url = req.originalUrl;

      // Check for static assets
      if (path.extname(url) !== "") {
        console.warn(`${url} is not a valid router path`);
        res.status(404).end(`${url} is not a valid router path`);
        return;
      }

      // Extract head content from Vite in development
      let viteHead = "";
      if (!isProd) {
        const transformedHtml = await vite.transformIndexHtml(
          url,
          `<html><head></head><body></body></html>`,
        );
        viteHead = transformedHtml.substring(
          transformedHtml.indexOf("<head>") + 6,
          transformedHtml.indexOf("</head>"),
        );
      }

      // Load server entry
      const entry = await (async () => {
        if (!isProd) {
          return vite.ssrLoadModule("/src/entry-server.tsx");
        } else {
          return import("./dist/server/entry-server.js");
        }
      })();

      console.info("Rendering:", url);
      await entry.render({ req, res, head: viteHead });
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.info("Server running at http://localhost:3000");
    }),
  );
}
