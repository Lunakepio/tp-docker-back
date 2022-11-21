import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  return (
    <nav>
      <ul>
        {location.pathname == "/Home" ? (
          <li>
            <Link className="active" to="/Home">
              􀎟&nbsp;&nbsp;Home
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/Home">􀎞&nbsp;&nbsp;Home</Link>
          </li>
        )}
        {location.pathname == "/admin" ? (
          <li>
            <Link className="active" to="/admin">􀐜 &nbsp;&nbsp;Admin</Link>
          </li>
        ) : (
          <li>
            <Link to="/admin">
              􀐜 &nbsp;&nbsp;Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
