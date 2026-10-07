import type { VercelRequest, VercelResponse } from "@vercel/node";

import { render } from "../../dist/server/entry-server.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await render({
    req: req as unknown as Parameters<typeof render>[0]["req"],
    res: res as unknown as Parameters<typeof render>[0]["res"],
    head: "",
  });
}
