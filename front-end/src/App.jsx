import * as React from "react";
import "./assets/style/settings.scss";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Post from "./Post";
import Admin from "./Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const Context = React.createContext();

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [userName, setUserName] = React.useState("Alex");
  const [userEmail, setUserEmail] = React.useState("alex@mail.com");
  const [userId, setUserId] = React.useState("636e2057c3aedc2ec43773df");
  
  return (
    <div className="App">
      <Context.Provider value={{userName, setUserName, userId, setUserId, isLogin, setIsLogin, userEmail, setUserEmail}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<div>ERROR 404</div>} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
