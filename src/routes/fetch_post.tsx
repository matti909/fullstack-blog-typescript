import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { listPosts } from "../api/posts";

export const Route = createFileRoute("/fetch_post")({
  loader: async ({ context }) => {
    await context.queryClient.query(getPosts);
  },
  headers: () => ({ "Cache-Control": "private, no-store" }),
  component: RouteComponent,
});

export const getPosts = queryOptions({
  queryKey: ["get-posts"],
  queryFn: () => listPosts(),
});

function RouteComponent() {
  const { data: data } = useSuspenseQuery(getPosts);
  return (
    <div>
      Hello! <div>{data.map((value) => value.contents)}</div>
    </div>
  );
}
