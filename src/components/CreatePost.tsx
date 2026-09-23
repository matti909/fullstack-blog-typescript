export const CreatePost = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="">Title: </label>
        <input
          type="text"
          name="create-title"
          value="create-title"
          id="create-title"
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-author">Author: </label>
        <input
          type="text"
          name="create-author"
          value="create-author"
          id="create-author"
        />
      </div>
      <br />
      <textarea></textarea>
      <br />
      <br />
      <input type="submit" name="" value="Create" />
    </form>
  );
};
