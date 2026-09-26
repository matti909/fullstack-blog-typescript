import type { SortOrder } from "mongoose";

import { type Blog, Post } from "../models/post.js";
import { postRepository } from "../repositories/post.repository.js";

interface ListPostsOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}

interface ListPostsQuery {
  author?: string;
  tags?: string | string[];
}

const createPost = async (data: Pick<Blog, "contents" | "tags" | "title">) => {
  const { contents, tags, title } = data;
  const post = new Post({ contents, tags, title });
  return await post.save();
};

const listPosts = async (
  query: ListPostsQuery = {},
  options: ListPostsOptions = {},
) => {
  return await postRepository.getAll({ filter: query, sort: options });
};

const listAllPosts = async (options: ListPostsOptions = {}) => {
  return await listPosts({}, options);
};

const listPostsByAuthor = async (
  author: string,
  options: ListPostsOptions = {},
) => {
  return await listPosts({ author }, options);
};

async function listPostsByTag(
  tags: string[],
  options: ListPostsOptions = {},
) {
  return await listPosts({ tags }, options);
}

export {
  createPost,
  listAllPosts,
  listPosts,
  listPostsByAuthor,
  listPostsByTag,
};
