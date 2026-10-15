import type { SortOrder } from "mongoose";

import { Types } from "mongoose";
import { Post } from "./post.model.js";
import { postRepository } from "./post.repository.js";

interface ListPostsOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}

interface ListPostsQuery {
  author?: string;
  tags?: string | string[];
}

interface CreatePostInput {
  author: string;
  contents: string;
  tags?: string[];
  title: string;
}

const createPost = async (data: CreatePostInput) => {
  return await postRepository.create({
    ...data,
    author: new Types.ObjectId(data.author),
  });
};

const listPosts = async (
  query: ListPostsQuery = {},
  options: ListPostsOptions = {},
) => {
  const { sortBy = "createdAt", sortOrder = "descending" } = options;
  return await Post.find(query)
    .sort({ [sortBy]: sortOrder })
    .populate("author", "username")
    .lean();
};

const getPostById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Post.findById(id).populate("author", "username").lean();
};

export { createPost, getPostById, listPosts };
