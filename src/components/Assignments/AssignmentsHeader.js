import React, { useContext, useState } from "react";

import profile from "../../icons/profile.svg";
import AuthContext from "../store/AuthContext";
import classes from "./Assignments.module.css";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import Register from "../Auth/Register";

const AssignmentsHeader = (props) => {
  const { currentType } = props;
  const ctx = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleLoginWindow = () => {
    if (ctx.loggedIn) setShowLogout((state) => !state);
    else setShowLogin((state) => !state);
  };
  const toggleRegisterWindow = () => setShowRegister((state) => !state);

  return (
    <header>
      <span className={`${currentType === "i" ? classes["active-type"] : ""}`}>
        <span
          className={classes.type}
          onClick={props.setIncomplete}
          tabIndex={1}
        >
          incomplete
        </span>
      </span>
      <span className={`${currentType === "p" ? classes["active-type"] : ""}`}>
        <span
          className={classes.type}
          onClick={props.setPaymentPending}
          tabIndex={2}
        >
          payment pending
        </span>
      </span>
      <span className={`${currentType === "c" ? classes["active-type"] : ""}`}>
        <span className={classes.type} onClick={props.setComplete} tabIndex={3}>
          complete
        </span>
      </span>

      <div className={classes.loginBar} onClick={toggleLoginWindow}>
        <span className={classes.profileName}>
          {ctx.email === null ? "Login" : ctx.email.split("@")[0]}
        </span>
        <img src={profile} alt="profile" />
      </div>

      {showLogout && <Logout onClose={toggleLoginWindow} />}

      {showLogin && (
        <Login
          onClose={toggleLoginWindow}
          toggleRegister={toggleRegisterWindow}
        />
      )}
      {showRegister && (
        <Register
          onClose={toggleRegisterWindow}
          toggleLogin={toggleLoginWindow}
        />
      )}
    </header>
  );
};

export default AssignmentsHeader;
