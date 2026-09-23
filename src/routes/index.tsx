// src/routes/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { Sorting } from "../components/Sorting";
import { Filters } from "../components/Filters";
//import { PostList } from "../components/PostList";
import { CreatePost } from "../components/CreatePost";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <Filters field="author" />
      <br />
      <Sorting fields={["createdAt"]} />
      <hr />
    </div>
  );
}
