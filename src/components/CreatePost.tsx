export const CreatePost = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <label htmlFor="">Title: </label>
        <input
          className="block font-medium text-slate-900"
          type="text"
          placeholder="Hello..."
          name="create-title"
          id="create-title"
        />
      </div>
      <br />
      <div className="space-y-2">
        <label htmlFor="create-author">Author: </label>
        <input
          className="block font-medium text-slate-900"
          type="text"
          name="create-author"

          id="create-author"
        />
      </div>
      <br />
      <textarea></textarea>
      <br />
      <br />
      <input type="submit" name="" />
    </form>
  );
};
