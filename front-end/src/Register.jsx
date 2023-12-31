import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Register");

  const navigate = useNavigate();

  const registerMongo = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("")
    setButtonText("Registering...");
    axios
      .post("http://localhost:3000/users", {
        name: name,
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.status);
          res.status === 201 ? setButtonText("Registered successfully !") : setButtonText("Failed registery...");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        
      });
  }

  const handleKey = (e) => {
    if (e.key === "Enter") {
      registerMongo();
    }
  }


  return (
  <div className="login">
    <div className="login__container">
      <h1 className="login__title">Register</h1>
      <form className="login__form">
        <div className="login__group">
        <label className="login__label" htmlFor="name">
            Name
          </label>
          <input
            className="login__input"
            type="text"
            name="name"
            id="name"
            placeholder="Ex: Steve Jobs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            type="email"
            name="email"
            id="email"
            placeholder="Ex: Steve@apple.com"
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
            placeholder="Ex: 123456 (don't use this)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={buttonText === "Register" ? "login__button" : buttonText === "Registered successfully !" ? "login__button green" : buttonText === "Failed registery..." ? "login__button red" : buttonText === "Registering..." ? "login__button" : ""} onClick={(e) => registerMongo(e)} onKeyDown={(e) => handleKey(e)}> {buttonText} </button>

          <div className="login__links">
            <p className="login__link">Already have an account? <Link to="/">Login here !</Link></p>

          </div>
        </div>
      </form>
    </div>
  </div>);
}

export default Register;
