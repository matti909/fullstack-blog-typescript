import { Router } from "express";

import { postUser, signinUser } from "./user.controller.js";

const router = Router();

router.post("/signup", postUser);
router.post("/login", signinUser);

export { router };
