const Button = ({ title, className = "", ...props }) => {
  return (
    <button
      className={`p-2.5 rounded-2xl text-white font-semibold 
        cursor-pointer shadow-md hover:shadow-lg active:scale-90 
        transition-all ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
