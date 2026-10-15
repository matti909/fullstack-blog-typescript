import supertest from "supertest";
import { describe, expect } from "@jest/globals";
import bcrypt from "bcrypt";

import app from "../app.ts";
import { User } from "../modules/user/user.model.js";

const uniqueUsername = () =>
  `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

describe("POST /api/users/signup", () => {
  it("returns 201 and username when username and password are provided", async () => {
    const payload = { password: "secret123", username: uniqueUsername() };
    const response = await supertest(app)
      .post("/api/users/signup")
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ username: payload.username });
  });

  it("stores the user with a hashed password", async () => {
    const payload = { password: "secret123", username: uniqueUsername() };
    const response = await supertest(app)
      .post("/api/users/signup")
      .send(payload);

    expect(response.status).toBe(201);

    const stored = await User.findOne({ username: payload.username }).lean();
    expect(stored).toBeDefined();
    expect(stored?.password).toBeDefined();
    expect(stored?.password).not.toBe(payload.password);
    expect(
      await bcrypt.compare(payload.password, stored?.password as string),
    ).toBe(true);
  });
});
