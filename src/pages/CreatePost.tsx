import { CreatePost as CreatePostForm } from "../components/CreatePost";
import "./createPost.css";

export default function CreatePostPage() {
  return (
    <section className="createpost">
      <p className="createpost-kicker">Write</p>
      <h2 className="createpost-title">Create a new post</h2>
      <p className="createpost-desc">
        Completa el título, autor y contenido para publicar.
      </p>
      <CreatePostForm />
    </section>
  );
}
