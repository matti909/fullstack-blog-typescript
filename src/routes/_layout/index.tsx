import { createFileRoute } from "@tanstack/react-router";

import { CreatePost } from "../../components/CreatePost";
import { Filters } from "../../components/Filters";
import { Sorting } from "../../components/Sorting";

export const Route = createFileRoute("/_layout/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <Filters field="author" />
      <br />
      <Sorting fields={["createdAt"]} />
      <hr />
    </>
  );
}
