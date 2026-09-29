import { Router } from "express";

import { router as postRouter } from "../modules/post/post.routes.js";
import { router as userRouter } from "../modules/user/user.routes.js";

export const apiRouter = Router();

apiRouter.use("/posts", postRouter);
apiRouter.use("/users", userRouter);
