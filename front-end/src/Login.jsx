import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
const [buttonText, setButtonText] = React.useState("Register");

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__button">Login</button>

          <div className="login__links">
            <p className="login__link">Already have an account?</p>

            <p className="login__link">Create an account</p>
          </div>
        </div>
      </form>
    </div>
  </div>);
}

export default Login;
