import { Request, Response } from "express";

import { createUser, getUserById, loginUser } from "./user.service.js";

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
    const { token, user } = await loginUser({ password, username });
    return res.status(200).send({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: "login failed,",
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params as { _id: string };
    const user = await getUserById(_id);
    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "invalid user id" });
  }
};

export { getUser, postUser, signinUser };
