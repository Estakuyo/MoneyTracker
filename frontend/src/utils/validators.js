export const validators = {
  required: (value) =>
    !value || value.trim() === "" ? "This field is required" : "",

  email: (value) => {
    if (!value) return "Email is required";
    return !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "";
  },

  username: (value) => {
    if (!value) return "Username is required";
    return value.trim().length < 5
      ? "Username must be at least 5 characters"
      : "";
  },

  password: (value) => {
    if (!value) return "Password is required";
    return value.length < 8 ? "Password must be at least 8 characters" : "";
  },

  confirmPassword: (value, password) => {
    if (!value) return "Please confirm your password";
    return value !== password ? "Passwords do not match" : "";
  },

  price: (value) => {
    if (!value) return "Amount is required";
    return isNaN(value) || Number(value) <= 0 ? "Enter a valid amount" : "";
  },
};
