import { Router } from "express";

import { generatePost, getPosts } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", generatePost);

export { router };
