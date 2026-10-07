import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useAuth } from "../auth";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/_layout")({
  beforeLoad: ({ context }) => {
    // En servidor no hay localStorage: el contexto siempre es deslogueado.
    // Redirigir acá rompería el reload con sesión válida; la enforcement
    // en cliente la hace el restore de AuthProvider.
    if (typeof window === "undefined") return;
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  const { state } = useAuth();
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>
      <main className="content">
        {state.isLoading ? <p>Loading...</p> : <Outlet />}
      </main>
    </div>
  );
}
