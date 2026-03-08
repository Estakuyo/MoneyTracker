const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-primary-600 mb-4 border-b border-gray-200 pb-2">
          {title}
        </h2>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
