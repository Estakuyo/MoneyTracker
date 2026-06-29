import { useState, useCallback } from "react";

/**
 * useAlert — simple hook to manage an AlertBox's state.
 *
 * Returns:
 *  - alert        { message, type } | null
 *  - showAlert    (message, type?) => void   — fire an alert
 *  - clearAlert   () => void                 — dismiss it
 */
const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "success") => {
    setAlert({ message, type });
  }, []);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return { alert, showAlert, clearAlert };
};

export default useAlert;
