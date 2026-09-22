import { generatePost } from "../controllers/post.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", generatePost);

export { router };
