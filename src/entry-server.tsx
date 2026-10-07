// src/entry-server.tsx
import { pipeline } from "node:stream/promises";
import {
  RouterServer,
  createRequestHandler,
  renderRouterToStream,
} from "@tanstack/react-router/ssr/server";
import { createRouter } from "./router";
import type express from "express";

export async function render({
  req,
  res,
  head = "",
}: {
  head?: string;
  req: express.Request;
  res: express.Response;
}) {
  // Convert Express request to Web API Request
  const url = new URL(req.originalUrl || req.url, "https://localhost:3000")
    .href;

  const request = new Request(url, {
    method: req.method,
    headers: (() => {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        headers.set(key, value as any);
      }
      return headers;
    })(),
  });

  // Create request handler
  const handler = createRequestHandler({
    request,
    createRouter: () => {
      const router = createRouter();

      // Inject server context (like head tags from Vite)
      router.update({
        context: {
          ...router.options.context,
          head: head,
        },
      });
      return router;
    },
  });

  // Render to string (non-streaming)
  const response = await handler(({ responseHeaders, router, request }) =>
    renderRouterToStream({
      request,
      responseHeaders,
      router,
      children: <RouterServer router={router} />,
    }),
  );

  // Convert Web API Response back to Express response
  res.statusMessage = response.statusText;
  res.status(response.status);

  response.headers.forEach((value, name) => {
    res.setHeader(name, value);
  });

  // Stream response body
  return pipeline(response.body as any, res);
}
