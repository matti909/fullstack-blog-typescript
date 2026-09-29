import { Router } from "express";

import { postUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", postUser);

export { router };
