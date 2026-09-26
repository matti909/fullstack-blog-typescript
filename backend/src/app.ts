import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";

import { apiRouter } from "./routes/index.js";

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

export default app;
