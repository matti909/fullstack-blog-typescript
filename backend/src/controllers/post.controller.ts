import { NextFunction, Request, Response } from "express";
import { createPost } from "../services/post.service.js";

export const generatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { contents, tags, title } = req.body as {
      contents: string;
      tags: [string];
      title: string;
    };
    const post = await createPost({ contents, tags, title });

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create blog" });
  }
};
