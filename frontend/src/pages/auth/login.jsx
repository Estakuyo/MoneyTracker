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
        className="border border-slate-300 shadow-2xl rounded-2xl flex flex-col py-6 px-8 gap-4 w-4/5 max-w-md"
      >
        <h1 className="m-4 text-center font-bold text-2xl">Sign In</h1>

        <label className="flex flex-col">
          Username
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </label>

        <label className="flex flex-col">
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>

        <button type="submit" className="mx-auto mt-6 mb-4 auth-btn">
          Login
        </button>
        <p className="text-center text-slate-600">
          Don't have an account? <br />
          <a href="/register" className="underline text-blue-500">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
