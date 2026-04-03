const Dropdown = ({ name, value, onChange, options }) => {
  return (
    <div className="flex items-center gap-2.5">
      <label className="font-medium text-gray-700">{name}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-md border px-2 py-1"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
