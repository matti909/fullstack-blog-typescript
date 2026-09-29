import { Router } from "express";

import { postUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/user/signup", postUser);

export { router };
