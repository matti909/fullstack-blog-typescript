// src/routes/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { Sorting } from "../components/Sorting";
import { Filters } from "../components/Filters";
//import { PostList } from "../components/PostList";
import { CreatePost } from "../components/CreatePost";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>
      <main className="content">
        <CreatePost />
        <br />
        <hr />
        Filter by:
        <Filters field="author" />
        <br />
        <Sorting fields={["createdAt"]} />
        <hr />
      </main>
    </div>
  );
}
