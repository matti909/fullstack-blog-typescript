import { createFileRoute } from "@tanstack/react-router";

import SignupPage from "../components/SignupPage";

export const Route = createFileRoute("/signup")({
  component: SignupRoutePage,
});

function SignupRoutePage() {
  return <SignupPage />;
}
