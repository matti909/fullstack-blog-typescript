import bcrypt from "bcrypt";

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
