import { UserContext } from "../../context/authContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { validators } from "../../utils/validators";
import { useFormErrors } from "../../hooks/useFormError";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const { errors, setError, clearError, clearAllErrors } = useFormErrors();

  // Inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate
    const usernameError = validators.username(username);
    const passwordError = validators.password(password);
    setError("username", usernameError);
    setError("password", passwordError);

    if (usernameError || passwordError) return;

    try {
      await login({ username, password });
      clearAllErrors();
      navigate("/home");
    } catch (error) {
      setError("general", "Invalid username or password");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="auth-form backdrop-blur-sm bg-primary-600/90 animate-slide-up"
      >
        <h1 className="auth-header text-white mb-2 animate-fade-in-delay-1">
          Welcome Back
        </h1>
        <p className="text-center text-primary-100 text-sm mb-4 animate-fade-in-delay-1">
          Sign in to continue to MoneyTracker
        </p>
        {errors.general && (
          <p className="text-red-500 text-sm p-2 bg-error-200/75 rounded w-fit mx-auto">
            {errors.general}
          </p>
        )}

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Username</span>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError("username");
            }}
            placeholder="Enter your username"
            required
            className={`input-field bg-white/95 text-gray-800 placeholder:text-gray-400 ${
              errors.username ? "border-2 border-error-400" : ""
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs p-2 bg-error-200/75 rounded w-fit">
              {errors.username}
            </p>
          )}
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Password</span>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              placeholder="Enter your password"
              required
              className={`input-field pr-11 bg-white/95 text-gray-800 placeholder:text-gray-400 ${
                errors.password ? "border-2 border-error-400" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs p-2 bg-error-200/75 rounded w-fit">
              {errors.password}
            </p>
          )}
        </label>

        <button type="submit" className="auth-btn animate-fade-in-delay-3">
          Sign In
        </button>

        <div className="text-center text-primary-100 text-sm border-t border-primary-400/30 pt-4 animate-fade-in-delay-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-accent-400 hover:text-accent-300 hover:underline transition-colors"
          >
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
