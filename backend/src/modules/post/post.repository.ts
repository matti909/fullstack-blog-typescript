import type { Blog } from "./post.model.js";

import { createBaseRepository } from "../../shared/repositories/base.repository.js";
import { Post } from "./post.model.js";

export const postRepository = createBaseRepository<Blog>(Post);
