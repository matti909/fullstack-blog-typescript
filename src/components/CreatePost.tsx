import InputCustom from "./InputCustom";

export const CreatePost = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <InputCustom
          type="text"
          placeholder="Hello..."
          name="create-title"
          label="Title"
        />
      </div>
      <br />
      <div className="space-y-2">
        <InputCustom
          className="bg-cyan-950"
          type="text"
          placeholder="Here author name..."
          name="create-author"
          id="create-author"
          label="Author"
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
