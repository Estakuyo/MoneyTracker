import "./styles/loginPage.css";

const LoginPage = () => {
  return (
    <>
      <form className="authPage">
        <h1>Log In</h1>

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
    </>
  );
};

export default LoginPage;
