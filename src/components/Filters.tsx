interface iFilter {
  field: string;
}

export const Filters = ({ field }: iFilter) => {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input type="text" name={`filter-${field}`} id={`filter-${field}`} />
    </div>
  );
};
