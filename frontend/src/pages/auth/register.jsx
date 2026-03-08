import { UserContext } from "../../context/authContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            className="input-field bg-white/95 text-gray-800 placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-3">
          <span className="text-sm font-medium text-primary-50">
            Confirm Password
          </span>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="input-field bg-white/95 text-gray-800 placeholder:text-gray-400"
          />
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
