const Modal = ({ title, children, isOpen, onClose = () => {} }) => {
  if (isOpen) {
    return (
      <div className="inset-0 z-20 fixed bg-black/50 flex justify-center items-center">
        <div className="relative md:w-lg h-9/12 bg-white p-5 rounded-lg flex flex-col">
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
          <div className="pt-5 overflow-y-auto no-scrollbar">{children}</div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Modal;
