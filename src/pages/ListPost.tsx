import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { listPosts } from "../api/posts";
import type { ApiPost } from "../types/post";
import "./listPost.css";

export function formatShortDate(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ListPost() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError("");
      try {
        const data = await listPosts({
          sort: { sortBy: "createdAt", sortOrder: "descending" },
        });
        setPosts(data);
      } catch {
        setError("No se pudieron cargar los posts.");
      } finally {
        setLoading(false);
      }
    }
    void fetchPosts();
  }, []);

  return (
    <section className="listpost">
      <p className="listpost-kicker">Articles</p>
      <h1 className="listpost-title">All posts</h1>

      {loading && <p className="listpost-status">Loading posts...</p>}
      {error && <p className="listpost-status">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="listpost-status">No hay posts todavía.</p>
      )}

      <div className="listpost-list">
        {posts.map((post) => (
          <Link
            key={post._id}
            to="/$id"
            params={{ id: post._id }}
            className="listpost-card-link"
          >
            <article className="listpost-card">
              <h2>{post.title}</h2>
              <div className="listpost-card-meta">
                {post.author ? (
                  <span>
                    By <strong>{post.author.username}</strong>
                  </span>
                ) : (
                  <span />
                )}
                <time dateTime={post.createdAt}>
                  {formatShortDate(post.createdAt)}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
