import { UserContext } from "../../context/authContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/");
    } catch (error) {
      console.log(error);
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

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Username</span>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="input-field bg-white/95 text-gray-800 placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Password</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="input-field bg-white/95 text-gray-800 placeholder:text-gray-400"
          />
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
