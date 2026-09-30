import mongoose, { InferSchemaType, Schema } from "mongoose";

const userSchema = new Schema(
  {
    password: { required: true, type: String },
    username: { required: true, type: String, unique: true },
  },
  { timestamps: true },
);

export type TUser = InferSchemaType<typeof userSchema> & {
  createdAt: Date;
  updatedAt: Date;
};
export const User = mongoose.model("user", userSchema);
