const Button = ({
  title,
  className = "",
  textColor = "text-white",
  ...props
}) => {
  return (
    <button
      className={`p-2.5 rounded-2xl font-semibold 
        cursor-pointer shadow-sm hover:shadow-lg active:scale-90 
        transition-all ${textColor} ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
