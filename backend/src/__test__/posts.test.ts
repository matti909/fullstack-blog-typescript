import mongoose from "mongoose";

import { describe, expect, test } from "@jest/globals";

import { Post } from "../modules/post/post.model.js";
import { createPost } from "../modules/post/post.service.js";

describe("create posts", () => {
  test("with all parameters should succeed", async () => {
    const post = {
      title: "Hello Mongoose!",
      author: "matias v1",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };
    const createdPost = await createPost(post);
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    const foundPost = await Post.findById(createdPost._id);
    if (foundPost === null) {
      throw new Error("Post not found");
    }
    expect(foundPost).toEqual(expect.objectContaining(post));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });
});
