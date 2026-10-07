interface LoginResponse {
  token: string;
  user: {
    _id: string;
    username: string;
  };
}

interface Credentials {
  password: string;
  username: string;
}

function rethrow(error: unknown, fallback: string): never {
  if (error instanceof Error) throw error;
  throw new Error(fallback);
}

export const userApi = {
  signup: async ({
    password,
    username,
  }: {
    password: string;
    username: string;
  }): Promise<void> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ password, username }),
        },
      );
      if (!res.ok) {
        throw new Error("failed to sign up");
      }
      return await res.json();
    } catch (error) {
      rethrow(error, "failed to sign up");
    }
  },
  login: async ({
    password,
    username,
  }: Credentials): Promise<LoginResponse> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ password, username }),
        },
      );
      if (!res.ok) {
        throw new Error("failed log in");
      }
      return (await res.json()) as LoginResponse;
    } catch (error) {
      rethrow(error, "failed log in");
    }
  },
  getUserById: async (
    id: string,
    token: string | null,
  ): Promise<LoginResponse["user"] | null> => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/${id}`,
      {
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`failed to fetch user: ${res.status}`);
    }
    return (await res.json()) as LoginResponse["user"];
  },
};
