import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.PORT ?? "9001";

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
