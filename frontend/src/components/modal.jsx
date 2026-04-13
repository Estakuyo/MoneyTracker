const Modal = ({ title, children, isOpen, onClose = () => {} }) => {
  if (isOpen) {
    return (
      <div className="z-20 fixed w-screen h-screen bg-black/50 flex justify-center items-center">
        <div className="relative min-w-80 max-w-6/12 max-h-9/12 bg-white p-5 rounded-lg">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
          <h1 className="text-center border-b border-gray-200 pb-2.5 text-xl font-semibold text-primary-600">
            {title}
          </h1>
          <div>{children}</div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Modal;
