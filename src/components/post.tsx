interface post {
  title: string;
  contents: string;
  author?: string;
}

const post = ({ title, contents, author }: post) => {
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

export default post;
