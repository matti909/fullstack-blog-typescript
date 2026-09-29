import bcrypt from "bcrypt";

import { User } from "../models/user.js";

interface IUser {
  password: string;
  username: string;
}

export async function createUser({ password, username }: IUser) {
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({
    password: hashPassword,
    username,
  });
  return await user.save();
}
