interface iSorting {
  fields: [string];
}

export const Sorting = ({ fields }: iSorting) => {
  return (
    <div>
      <label htmlFor="sortBy">Sort By: </label>
      <select name="sortBy" id="sortBy">
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {" / "}
      <label htmlFor="sortOrder">Sort Order: </label>
      <select name="sortOrder" id="sortOrder">
        <option value={"ascending"}>ascending</option>
        <option value={"descending"}>descending</option>
      </select>
    </div>
  );
};
