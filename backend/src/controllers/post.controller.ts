import { Request, Response } from "express";

import { createPost, listPosts } from "../services/post.service.js";

const VALID_SORT_ORDERS = ["asc", "ascending", "desc", "descending"] as const;

type QuerySortOrder = (typeof VALID_SORT_ORDERS)[number];

const firstString = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    const items: unknown[] = value;
    const [first] = items;
    return typeof first === "string" ? first : undefined;
  }
  return undefined;
};

const stringArray = (value: unknown): string | string[] | undefined => {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    const items: unknown[] = value;
    return items.every((item) => typeof item === "string")
      ? (items as string[])
      : undefined;
  }
  return undefined;
};

const parseSortOrder = (value: unknown): QuerySortOrder | undefined => {
  return VALID_SORT_ORDERS.find((order) => order === value);
};

const generatePost = async (req: Request, res: Response) => {
  try {
    const { contents, tags, title } = req.body as {
      contents: string;
      tags: [string];
      title: string;
    };
    const post = await createPost({ contents, tags, title });

    res.status(201).json({
      data: {
        post,
      },
      status: "success",
    });
  } catch {
    return res.status(500).json({ message: "Failed to create blog" });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const author = firstString(req.query.author);
    const tags = stringArray(req.query.tags);
    const sortBy = firstString(req.query.sortBy);
    const sortOrder = parseSortOrder(req.query.sortOrder);

    const posts = await listPosts(
      {
        ...(author !== undefined ? { author } : {}),
        ...(tags !== undefined ? { tags } : {}),
      },
      {
        ...(sortBy !== undefined ? { sortBy } : {}),
        ...(sortOrder !== undefined ? { sortOrder } : {}),
      },
    );

    res.status(200).json({
      data: {
        posts,
      },
      status: "success",
    });
  } catch {
    return res.status(500).json({ message: "Failed to list posts" });
  }
};

export { generatePost, getPosts };
