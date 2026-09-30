import { InferSchemaType, model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    author: String,
    contents: String,
    tags: [String],
    title: { required: true, type: String },
  },
  { timestamps: true, versionKey: false },
);

export type Blog = InferSchemaType<typeof postSchema> & {
  createdAt: Date;
  updatedAt: Date;
};
export const Post = model("post", postSchema);
