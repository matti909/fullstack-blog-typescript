import { Router } from "express";

import { router as postRouter } from "./post.route.js";
import { router as userRouter } from "./user.route.js";

export const apiRouter = Router();

apiRouter.use("/posts", postRouter);
apiRouter.use("/users", userRouter);
