import type { VercelRequest, VercelResponse } from "@vercel/node";

import app from "../backend/dist/app.js";
import { ConnectDB } from "../backend/dist/config/database.js";

// Una vez por cold start; las invocaciones warm reutilizan la conexión.
await ConnectDB();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return (app as unknown as (req: unknown, res: unknown) => unknown)(req, res);
}
