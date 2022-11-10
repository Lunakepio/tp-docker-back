import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "./App";


function Login() {
  const values = React.useContext(Context);
  const navigate = useNavigate();
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
          setButtonText("Logged in successfully !");
          setEmail("");
          setPassword("");
          values.setUserName(res.data.name);
          values.setUserEmail(res.data.email);
          values.setUserId(res.data._id);
          values.setIsLogin(true);
          navigate("/home");
          console.log("test2");
          console.log(values);
      })
      .catch((err) => {
        console.log(err);
        setButtonText("Login failed...");
      }
      );

     
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
                  : buttonText === "User not found..."
                  ? "login__button red"
                  : ""
                  
              }
              onClick={(e) => loginMongo(e)}
              onKeyDown={(e) => handleKey(e)}
            >
              {" "}
              {buttonText}{" "}
            </button>

            <div className="login__links">
              <p className="login__link">Forgot password?</p>

              <p className="login__link"><Link to='/register'>Create an account</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
