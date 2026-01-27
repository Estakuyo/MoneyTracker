import "./styles/loginRegisterPage.css";

import { useState } from "react";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // User fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      console.log({ error: "Password does not match" });
      return;
    }
    console.log({ email, username });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username, message: "Logged In Successful" });
  };

  return (
    <div className="centerContainer">
      <div className={`authWrapper ${isLogin ? "right" : ""}`}>
        <div className="formCover">
          {isLogin ? (
            <div className="formCoverWrapperLeft">
              <h1>Don't have an account yet?</h1>
              <button onClick={changeForm}>Sign Up</button>
            </div>
          ) : (
            <div className="formCoverWrapperRight">
              <h1>Already have an account?</h1>
              <button onClick={changeForm}>Sign In</button>
            </div>
          )}
        </div>
        {/* Register Form */}
        <form onSubmit={handleRegister} className="authFormReg">
          <h1>Register</h1>

          <label>
            Email
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Username
            <input
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label>
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <button type="submit">Register</button>
        </form>

        <form onSubmit={handleLogin} className="authFormLog">
          <h1>Login</h1>

          <label>
            Username
            <input
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
