import "./styles/loginRegisterPage.css";

import { useState } from "react";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin((prev) => !prev);
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
