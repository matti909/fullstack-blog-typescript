import express, { Application } from "express";
import { router } from "./routes/post.route.js";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

export default app;
