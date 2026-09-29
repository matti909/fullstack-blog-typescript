import { Request, Response } from "express";

import { createUser } from "../services/user.service.js";

const postUser = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body as {
      password: string;
      username: string;
    };
    const user = await createUser({ password, username });
    return res.status(201).json({ username: user.username });
  } catch (error) {
    console.error(error);
  }
};

export { postUser };
