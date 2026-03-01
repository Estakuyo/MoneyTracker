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
      <form onSubmit={handleRegister} className="auth-form">
        <h1 className="auth-header">Register</h1>

        <label className="flex flex-col">
          Email
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </label>

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

        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>

        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        </label>

        <button type="submit" className="auth-btn">
          Register
        </button>
        <p className="text-center text-slate-600">
          Already have an account?
          <br />{" "}
          <a href="/login" className="hover:underline text-blue-500">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
