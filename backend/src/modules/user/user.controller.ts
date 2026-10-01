import { Request, Response } from "express";

import { createUser, loginUser } from "./user.service.js";

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

const signinUser = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body as {
      password: string;
      username: string;
    };
    const token = await loginUser({ password, username });
    return res.status(200).send({
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: "login failed,",
    });
  }
};

export { postUser, signinUser };
