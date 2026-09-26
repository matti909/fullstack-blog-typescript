import { Post } from "../models/post.js";
import { createBaseRepository } from "./base.repository.js";

export const postRepository = createBaseRepository(Post);
