import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userRepository } from "./user.repository.js";

interface IUser {
  password: string;
  username: string;
}

export async function createUser({ password, username }: IUser) {
  const hashPassword = await bcrypt.hash(password, 10);

  return await userRepository.create({
    password: hashPassword,
    username,
  });
}

export async function getUserById(_id: string) {
  const user = await userRepository.findById(_id);
  if (!user) return null;
  return { _id: user._id, username: user.username };
}

export async function loginUser({ password, username }: IUser) {
  const user = await userRepository.findOne({ username });

  if (!user) {
    throw new Error("Invalid argument");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("invalid password!");
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET");
  }

  const token = jwt.sign({ sub: user._id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return {
    token,
    user: { _id: user._id, username: user.username },
  };
}


