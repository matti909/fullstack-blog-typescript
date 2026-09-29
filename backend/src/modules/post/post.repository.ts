import { createBaseRepository } from "../../shared/repositories/base.repository.js";
import { Post } from "./post.model.js";

export const postRepository = createBaseRepository(Post);
