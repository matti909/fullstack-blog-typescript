import type { SortOrder } from "mongoose";

import { type Blog } from "./post.model.js";
import { postRepository } from "./post.repository.js";

interface ListPostsOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}

interface ListPostsQuery {
  author?: string;
  tags?: string | string[];
}

const createPost = async (data: Pick<Blog, "contents" | "tags" | "title">) => {
  return await postRepository.create(data);
};

const listPosts = async (
  query: ListPostsQuery = {},
  options: ListPostsOptions = {},
) => {
  return await postRepository.getAll({ filter: query, sort: options });
};

export { createPost, listPosts };
