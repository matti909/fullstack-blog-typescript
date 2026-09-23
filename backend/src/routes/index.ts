import { Router } from "express";
import { router as postRouter } from "./post.route.js";

export const apiRouter = Router();

apiRouter.use("/posts", postRouter);
