import { iPost, Post } from "./Post";

interface iList {
  posts: [iPost];
}

export const PostList = ({ posts }: iList) => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          author={post.author}
          contents={post.contents}
          title={post.title}
          key={post._id}
        />
      ))}
    </div>
  );
};
