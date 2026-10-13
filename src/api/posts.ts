import type {
  ApiPost,
  CreatePostResponse,
  ListPostsOptions,
  ListPostsResponse,
} from "../types/post";

export interface CreatePostInput {
  author: string;
  contents: string;
  tags?: string[];
  title: string;
}

// Sin var (build Vercel sin env) cae a mismo origen: /api/* vive
// en el mismo host en prod, previews y server mergeado local.
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "/api";

function buildPostsSearchParams(options: ListPostsOptions): URLSearchParams {
  const { filter = {}, sort = {} } = options;
  const search = new URLSearchParams();

  if (filter.author) {
    search.set("author", filter.author);
  }

  if (filter.tags) {
    const tags = Array.isArray(filter.tags) ? filter.tags : [filter.tags];
    for (const tag of tags) {
      search.append("tags", tag);
    }
  }

  if (sort.sortBy) {
    search.set("sortBy", sort.sortBy);
  }

  if (sort.sortOrder !== undefined) {
    search.set("sortOrder", String(sort.sortOrder));
  }

  return search;
}

export async function listPosts(
  options: ListPostsOptions = {},
): Promise<ApiPost[]> {
  const query = buildPostsSearchParams(options).toString();
  const url = query
    ? `${API_BASE_URL}/posts?${query}`
    : `${API_BASE_URL}/posts`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to list posts: ${response.status} ${response.statusText}`,
    );
  }

  const body = (await response.json()) as ListPostsResponse;
  return body.data.posts;
}

export async function createPost(input: CreatePostInput): Promise<ApiPost> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create post: ${response.status} ${response.statusText}`,
    );
  }

  const body = (await response.json()) as CreatePostResponse;
  return body.data.post;
}
