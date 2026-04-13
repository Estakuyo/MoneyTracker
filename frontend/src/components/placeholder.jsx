const Placeholder = ({
  title = "No data yet",
  description = "Content will appear here once available.",
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg border border-dashed border-gray-300 bg-gray-50 h-full flex flex-col justify-center px-4 py-10 text-center ${className}`}
    >
      <p className="text-lg font-semibold text-gray-600">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default Placeholder;
