import { useState, type SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { userApi } from "../api/userApi";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (credentials: { password: string; username: string }) =>
      userApi.signup(credentials),
    onSuccess: () => navigate({ to: "/login" }),
    onError: () => alert("Error in signup"),
  });

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutation.mutate({ password, username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-username">Username: </label>
        <input
          type="text"
          name="create-username"
          id="create-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-password">Password: </label>
        <input
          type="password"
          name="create-password"
          id="create-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type="submit"
        value={signupMutation.isPending ? "Signing up..." : "Sign Up"}
        disabled={!username || !password || signupMutation.isPending}
      />
    </form>
  );
};

export default SignupPage;
