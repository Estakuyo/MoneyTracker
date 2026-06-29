import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

/**
 * AlertBox — fixed toast notification
 *
 * Props:
 *  - message  {string}             Text to display
 *  - type     {"success"|"error"}  Controls colour and icon
 *  - onClose  {() => void}         Called when dismissed or after timeout
 *  - duration {number}             Auto-dismiss delay in ms (default 3500)
 */
const AlertBox = ({ message, type = "success", onClose, duration = 3500 }) => {
  const [visible, setVisible] = useState(false);

  // Slide in on mount
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 350); // wait for exit animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const isSuccess = type === "success";

  return (
    <div
      className={`
        fixed top-5 right-5 z-9999 flex items-start gap-3 rounded-xl px-4 py-3 shadow-xl
        border min-w-[260px] max-w-xs transition-all duration-350 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        ${
          isSuccess
            ? "bg-success-50 border-success-300 text-success-800"
            : "bg-error-50 border-error-300 text-error-800"
        }
      `}
      role="alert"
    >
      {/* Icon */}
      <div className="mt-0.5 shrink-0">
        {isSuccess ? (
          <CheckCircle2 size={20} className="text-success-500" />
        ) : (
          <XCircle size={20} className="text-error-500" />
        )}
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-medium leading-snug">{message}</p>

      {/* Close button */}
      <button
        onClick={handleClose}
        className={`shrink-0 rounded-md p-0.5 transition-colors duration-150
          ${
            isSuccess
              ? "hover:bg-success-100 text-success-600"
              : "hover:bg-error-100 text-error-600"
          }`}
        aria-label="Dismiss"
      >
        <X size={15} />
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 rounded-b-xl
          ${isSuccess ? "bg-success-400" : "bg-error-400"}
        `}
        style={{
          width: "100%",
          animation: `alert-shrink ${duration}ms linear forwards`,
        }}
      />
    </div>
  );
};

export default AlertBox;
