import bcrypt from "bcrypt";

import { User } from "./user.model.js";

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
