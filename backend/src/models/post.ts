import { Schema, model, InferSchemaType } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  contents: String,
  tags: [String],
});

export type Blog = InferSchemaType<typeof postSchema>;
export const Post = model("post", postSchema);
