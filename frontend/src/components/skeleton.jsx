const Skeleton = ({ className = "", style }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-300 ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
