export interface iPost {
  _id?: string;
  title: string;
  contents: string;
  author: string;
}

export const Post = ({ contents, title, author }: iPost) => {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  );
};
