import memoji from "./assets/img/memoji.png";
import { Context } from "./App";
import * as React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const values = React.useContext(Context);
  const [showProfileActions, setShowProfileActions] = React.useState(false);
  const navigate = useNavigate();

  const logout = () => {
    values.setIsLogin(false);
    values.setUserName("");
    values.setUserEmail("");
    values.setUserId("");
    navigate("/");
  }

  return (
    <div className="menu">
    <div className="profile">
      <div className="profilePicture">
        <img src={memoji} alt="profilePicture" />
      </div>
      <div className="profileName">
        <p>{values.userName}</p>
        <p>
          <span>{values.userEmail}</span>
        </p>
      </div>
      <div
        className="profileActions"
        onClick={() => setShowProfileActions(!showProfileActions)}
      >
        ‧‧‧
      </div>{" "}
      {showProfileActions ? (
        <div className="actions">
          <div className="row logout">
            <span onClick={() => logout()}>Logout</span>
          </div>
          <div className="row editProfile">
            <span onClick={() => navigate("/editProfile")}>
              Edit Profile
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
  );
}

export default Profile;