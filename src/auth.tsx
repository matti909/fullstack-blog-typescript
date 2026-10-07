import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { userApi } from "./api/userApi";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export interface User {
  _id: string;
  username: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthState {
  state: AuthSession & { isLoading: boolean };
  actions: {
    login: (password: string, username: string) => Promise<void>;
    logout: () => void;
  };
}

const LOGGED_OUT: AuthSession = { isAuthenticated: false, user: null };

// Lee storage de forma segura en SSR (getRouter y useState corren en servidor).
export function getStoredAuth(): AuthSession {
  if (typeof window === "undefined") return LOGGED_OUT;
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const rawUser = localStorage.getItem(USER_KEY);
    if (!token || !rawUser || isTokenExpired(token)) return LOGGED_OUT;
    const user = JSON.parse(rawUser) as User;
    if (!user?._id || !user?.username) return LOGGED_OUT;
    return { isAuthenticated: true, user };
  } catch {
    return LOGGED_OUT;
  }
}

// Solo decodifica exp: NO verifica la firma (eso lo hace el backend).
function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split(".");
    if (!payload) return true;
    const { exp } = JSON.parse(atob(payload)) as { exp?: number };
    if (!exp) return false;
    return Date.now() / 1000 >= exp;
  } catch {
    return true;
  }
}

function persistSession(token: string, user: User): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession>(getStoredAuth);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const navigate = useNavigate();

  const syncRouter = (next: AuthSession): void => {
    router.update({
      ...router.options,
      context: { ...router.options.context, auth: next },
    });
    void router.invalidate();
  };

  // Restore al montar: refresca el user contra GET /users/:_id.
  // 404 (borrado) => limpia; error de red => confía en storage.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = getStoredAuth();
      if (!stored.isAuthenticated || !stored.user) {
        if (!cancelled) {
          setSession(LOGGED_OUT);
          setIsLoading(false);
          // El guard no corre en servidor: si caímos en ruta protegida
          // sin sesión, redirigimos acá en cliente.
          const path = router.state.location.pathname;
          if (path !== "/login" && path !== "/signup") {
            void navigate({ to: "/login" });
          }
        }
        return;
      }
      const token = localStorage.getItem(TOKEN_KEY);
      try {
        const fresh =
          token && stored.user
            ? await userApi.getUserById(stored.user._id, token)
            : null;
        if (cancelled) return;
        if (!fresh) {
          clearSession();
          setSession(LOGGED_OUT);
          syncRouter(LOGGED_OUT);
        } else {
          const next: AuthSession = { isAuthenticated: true, user: fresh };
          localStorage.setItem(USER_KEY, JSON.stringify(fresh));
          setSession(next);
          syncRouter(next);
        }
      } catch {
        if (cancelled) return;
        setSession(stored);
        syncRouter(stored);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const login = async (
    password: string,
    username: string,
  ): Promise<void> => {
    const { token, user } = await userApi.login({ password, username });
    persistSession(token, user);
    const next: AuthSession = { isAuthenticated: true, user };
    setSession(next);
    syncRouter(next);
    await navigate({ to: "/" });
  };

  const logout = (): void => {
    clearSession();
    setSession(LOGGED_OUT);
    syncRouter(LOGGED_OUT);
    void navigate({ to: "/login" });
  };

  return (
    <AuthContext.Provider
      value={{
        state: { ...session, isLoading },
        actions: { login, logout },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
