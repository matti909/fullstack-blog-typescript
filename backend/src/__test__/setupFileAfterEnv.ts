import "dotenv/config";
import { afterAll, beforeAll } from "@jest/globals";
import mongoose from "mongoose";

import { ConnectDB } from "../config/database.js";

beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI;

  if (!baseUri) {
    throw new Error("Missing MONGODB_URI");
  }

  const separator = baseUri.endsWith("/") ? "" : "/";
  process.env.MONGODB_URI = `${baseUri}${separator}blog-test`;

  await ConnectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});
