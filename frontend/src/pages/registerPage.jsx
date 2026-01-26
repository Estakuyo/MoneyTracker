import "./styles/registerPage.css";

const RegisterPage = () => {
  return (
    <>
      <form className="authPage">
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
    </>
  );
};

export default RegisterPage;
