const Card = ({ title, children, className = "", button }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {title && (
        <div className="mb-4 border-b border-gray-200 pb-2 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary-600">{title}</h2>
          {button}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
