import * as React from "react";
import "./assets/style/settings.scss";

function Login() {
  return (
  <div className="login">
    <div className="login__container">
      <h1 className="login__title">Welcome back !</h1>
      <form className="login__form">
        <div className="login__group">
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />

          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            className="login__input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />

          <button className="login__button">Login</button>

          <div className="login__links">
            <p className="login__link">Forgot password?</p>

            <p className="login__link">Create an account</p>
          </div>
        </div>
      </form>
    </div>
  </div>);
}

export default Login;
