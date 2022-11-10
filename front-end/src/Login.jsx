import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Login");

  const loginMongo = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("test");
        console.log(res);
        if (res.status === 200) {
          setButtonText("Logged in successfully !");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        setPassword("");
        setButtonText("Login failed...");
      });
  };

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

            <button
              className={
                buttonText === "Login"
                  ? "login__button"
                  : buttonText === "Logged in successfully !"
                  ? "login__button green"
                  : buttonText === "Login failed..."
                  ? "login__button red"
                  : buttonText === "Loging in..."
                  ? "login__button"
                  : ""
              }
              onClick={(e) => loginMongo(e)}
              onKeyDown={(e) => handleKey(e)}
            >
              {" "}
              {buttonText}{" "}
            </button>

            <div className="login__links">
              <p className="login__link">Already have an account?</p>

              <p className="login__link">Create an account</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
