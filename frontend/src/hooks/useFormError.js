import { useState } from "react";

export const useFormErrors = () => {
  const [errors, setErrors] = useState({});

  const setError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const clearAllErrors = () => setErrors({});

  const hasErrors = () => Object.values(errors).some((e) => e !== "");

  return { errors, setError, clearError, clearAllErrors, hasErrors };
};
