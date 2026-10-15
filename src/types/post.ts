// Respuesta del backend: POST /api/posts
// Ejemplo: {"status":"success","data":{"post":{"title":"...","contents":"...","tags":[...],"_id":"..."}}}

export interface ApiPost {
  _id: string;
  title: string;
  contents: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  // Objeto populado por el backend (el modelo guarda ObjectId).
  // null en posts legacy sin autor.
  author?: { _id: string; username: string } | null;
}

export interface CreatePostResponse {
  status: "success";
  data: {
    post: ApiPost;
  };
}

// Query params del backend: GET /api/posts
// Espeja ListPostsQuery + ListPostsOptions del service (sin depender de mongoose).
export type PostsSortOrder = "asc" | "ascending" | "desc" | "descending" | 1 | -1;

// Query del GET /api/posts con la misma forma del base repository:
// un único objeto { filter, sort } y solo nuestros params.
export interface PostsFilter {
  author?: string;
  tags?: string | string[];
}

export interface PostsSort {
  sortBy?: string;
  sortOrder?: PostsSortOrder;
}

export interface ListPostsOptions {
  filter?: PostsFilter;
  sort?: PostsSort;
}

export interface ListPostsResponse {
  status: "success";
  data: {
    posts: ApiPost[];
  };
}

export interface GetPostResponse {
  status: "success";
  data: {
    post: ApiPost;
  };
}
