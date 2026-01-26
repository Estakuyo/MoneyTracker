import "./styles/loginRegisterPage.css";

import { useState } from "react";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const changeForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="centerContainer">
      <div className="authWrapper">
        {/* Register Form */}
        <form className="authFormReg">
          <h1>Register</h1>

          <label>
            Email
            <input name="email" type="email" />
          </label>

          <label>
            Username
            <input name="username" type="text" />
          </label>

          <label>
            Password
            <input name="password" type="password" />
          </label>

          <label>
            Confirm Password
            <input name="confirmPassword" type="password" />
          </label>

          <button type="submit">Register</button>
        </form>

        <form className="authFormLog">
          <h1>Login</h1>

          <label>
            Username
            <input name="username" type="text" />
          </label>

          <label>
            Password
            <input name="password" type="password" />
          </label>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
