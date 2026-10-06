import { Router } from "express";

import { getUser, postUser, signinUser } from "./user.controller.js";

const router = Router();

router.post("/signup", postUser);
router.post("/login", signinUser);
router.get("/:_id", getUser);

export { router };
