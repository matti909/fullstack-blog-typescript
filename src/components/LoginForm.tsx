import { useState, type SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../auth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { actions } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (credentials: { password: string; username: string }) =>
      actions.login(credentials.password, credentials.username),
    onError: () => alert("Error in login"),
  });

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ password, username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login-username">Username: </label>
        <input
          type="text"
          name="login-username"
          id="login-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="login-password">Password: </label>
        <input
          type="password"
          name="login-password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type="submit"
        value={loginMutation.isPending ? "Logging in..." : "Log In"}
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  );
};

export default LoginForm;
