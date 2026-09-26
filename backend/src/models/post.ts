import { InferSchemaType, model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    author: String,
    contents: String,
    tags: [String],
    title: { required: true, type: String },
  },
  { versionKey: false },
);

export type Blog = InferSchemaType<typeof postSchema>;
export const Post = model("post", postSchema);
