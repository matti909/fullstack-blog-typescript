import path from "node:path";
import { pathToFileURL } from "node:url";
import compression from "compression";
import express from "express";
import type { Request, Response } from "express";
import type { ViteDevServer } from "vite";

import app from "./app.js";
import { ConnectDB } from "./config/database.js";
import "dotenv/config";

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
// Raíz del frontend (vite.config.ts, src/, dist/): dos niveles arriba de src/.
const REPO_ROOT = path.resolve(import.meta.dirname, "..", "..");
const PORT = Number(process.env.PORT ?? 3000);
const HMR_PORT = process.env.VITE_DEV_SERVER_PORT
  ? Number(process.env.VITE_DEV_SERVER_PORT)
  : undefined;

interface ServerEntry {
  render: (args: {
    req: Request;
    res: Response;
    head: string;
  }) => Promise<void>;
}

export async function createServer(
  isProd = process.env.NODE_ENV === "production",
): Promise<{ app: typeof app; vite: ViteDevServer | undefined }> {
  // app ya trae cors + bodyParser + /api (ver app.ts): la API responde
  // primero y el fallback SSR queda último.
  let vite: ViteDevServer | undefined;
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      root: REPO_ROOT,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: { usePolling: true, interval: 100 },
        hmr: { port: HMR_PORT },
      },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(express.static(path.join(REPO_ROOT, "dist", "client")));
  }

  // Sin path: catch-all sin pasar por path-to-regexp (Express 5
  // rechaza app.use("*")).
  app.use(async (req: Request, res: Response): Promise<void> => {
    try {
      const url = req.originalUrl;
      if (path.extname(url) !== "") {
        console.warn(`${url} is not a valid router path`);
        res.status(404).end(`${url} is not a valid router path`);
        return;
      }

      let viteHead = "";
      if (!isProd && vite) {
        const transformedHtml = await vite.transformIndexHtml(
          url,
          "<html><head></head><body></body></html>",
        );
        viteHead = transformedHtml.substring(
          transformedHtml.indexOf("<head>") + 6,
          transformedHtml.indexOf("</head>"),
        );
      }

      const entry: ServerEntry =
        !isProd && vite
          ? ((await vite.ssrLoadModule(
              "/src/entry-server.tsx",
            )) as ServerEntry)
          : ((await import(
              pathToFileURL(
                path.join(REPO_ROOT, "dist", "server", "entry-server.js"),
              ).href
            )) as ServerEntry);

      console.info("Rendering:", url);
      await entry.render({ req, res, head: viteHead });
    } catch (e) {
      if (!isProd && vite) vite.ssrFixStacktrace(e as Error);
      console.error(e instanceof Error ? e.stack : e);
      res.status(500).end(e instanceof Error ? e.stack : String(e));
    }
  });

  return { app, vite };
}

async function bootstrap(): Promise<void> {
  try {
    await ConnectDB();

    const { app: serverApp } = await createServer();
    serverApp.listen(PORT, () => {
      console.info(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

if (!isTest) {
  void bootstrap();
}
