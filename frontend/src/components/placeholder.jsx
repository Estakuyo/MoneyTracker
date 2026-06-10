const Placeholder = ({
  title = "No data yet",
  description = "Content will appear here once available.",
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg border border-dashed border-primary-300 bg-secondary-50 h-full flex flex-col justify-center px-4 py-10 text-center ${className}`}
    >
      <p className="text-lg font-semibold text-primary-600">{title}</p>
      <p className="mt-1 text-sm text-secondary-500">{description}</p>
    </div>
  );
};

export default Placeholder;
