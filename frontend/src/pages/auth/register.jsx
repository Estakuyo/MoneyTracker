import { UserContext } from "../../context/authContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      console.log({ error: "Password does not match" });
      return;
    }
    try {
      await register({ email, username, password });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
    console.log({ email, username });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="auth-form backdrop-blur-sm bg-primary-600/90 animate-slide-up"
      >
        <h1 className="auth-header text-white mb-2 animate-fade-in-delay-1">
          Create Account
        </h1>
        <p className="text-center text-primary-100 text-sm mb-4 animate-fade-in-delay-1">
          Join MoneyTracker today
        </p>

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Email</span>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input-field bg-white/95 text-gray-800 placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Username</span>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            className="input-field bg-white/95 text-gray-800 placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-3">
          <span className="text-sm font-medium text-primary-50">Password</span>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="input-field pr-11 bg-white/95 text-gray-800 placeholder:text-gray-400"
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
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-3">
          <span className="text-sm font-medium text-primary-50">
            Confirm Password
          </span>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="input-field pr-11 bg-white/95 text-gray-800 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </label>

        <button type="submit" className="auth-btn animate-fade-in-delay-4">
          Create Account
        </button>

        <div className="text-center text-primary-100 text-sm border-t border-primary-400/30 pt-4 animate-fade-in-delay-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-accent-400 hover:text-accent-300 hover:underline transition-colors"
          >
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
