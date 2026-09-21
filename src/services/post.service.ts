import type { SortOrder } from "mongoose";
import { Post, type Blog } from "@/models/post.js";

interface ListPostsOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}

interface ListPostsQuery {
  author?: string;
  tags?: string | string[];
}

export const createPost = async (
  userId: string,
  data: Pick<Blog, "contents" | "tags" | "title">,
) => {
  const { contents, tags, title } = data;
  const post = new Post({ author: userId, contents, tags, title });
  return await post.save();
};

export const listPosts = async (
  query: ListPostsQuery = {},
  options: ListPostsOptions = {},
) => {
  const { sortBy = "createdAt", sortOrder = "descending" } = options;
  return await Post.find(query).sort({ [sortBy]: sortOrder });
};

export async function listAllPosts(options: ListPostsOptions = {}) {
  return await listPosts({}, options);
}

export async function listPostsByAuthor(
  author: string,
  options: ListPostsOptions = {},
) {
  return await listPosts({ author }, options);
}

export async function listPostsByTag(
  tags: string[],
  options: ListPostsOptions = {},
) {
  return await listPosts({ tags }, options);
}
