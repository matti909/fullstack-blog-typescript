import { useEffect, useState } from "react";
import { listPosts } from "../api/posts";
import type { ApiPost } from "../types/post";
import "./listPost.css";

export default function ListPost() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [author, setAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState("descending");

  async function fetchPosts(authorFilter: string, order: string) {
    setLoading(true);
    setError("");
    try {
      const data = await listPosts({
        filter: authorFilter ? { author: authorFilter } : {},
        sort: { sortBy: "createdAt", sortOrder: order as "ascending" | "descending" },
      });
      setPosts(data);
    } catch {
      setError("No se pudieron cargar los posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts("", "descending");
  }, []);

  function handleFilter(e: React.FormEvent) {
    e.preventDefault();
    fetchPosts(author, sortOrder);
  }

  return (
    <section className="listpost">
      <p className="listpost-kicker">Articles</p>
      <h1 className="listpost-title">All posts</h1>

      <div className="listpost-meta">
        <span>{posts.length} articles</span>
        <button
          type="button"
          className="listpost-copy"
          onClick={() => fetchPosts(author, sortOrder)}
        >
          Refresh
        </button>
      </div>

      <form className="listpost-filters" onSubmit={handleFilter}>
        <label>
          Author
          <input
            type="text"
            placeholder="Filter by author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Sort order
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
          </select>
        </label>
        <button type="submit">Apply</button>
      </form>

      {loading && <p className="listpost-status">Loading posts...</p>}
      {error && <p className="listpost-status">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="listpost-status">No hay posts todavía.</p>
      )}

      <div className="listpost-list">
        {posts.map((post) => (
          <article key={post._id} className="listpost-card">
            <h2>{post.title}</h2>
            <p className="listpost-excerpt">{post.contents}</p>
            <div className="listpost-card-meta">
              {post.author && (
                <span>
                  Written by <strong>{post.author}</strong>
                </span>
              )}
              {post.tags && post.tags.length > 0 && (
                <span className="listpost-tags">{post.tags.join(", ")}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
