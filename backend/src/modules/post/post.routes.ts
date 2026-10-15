import { Router } from "express";

import { generatePost, getPost, getPosts } from "./post.controller.js";

const router = Router();

router.get("/", getPosts);
router.get("/:_id", getPost);
router.post("/", generatePost);

export { router };
