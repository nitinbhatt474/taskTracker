import React, { useState, useContext } from "react";
import Modal from "../UI/Modal";
import FormInput from "../UI/FormInput";
import AuthContext from "../store/AuthContext";

import "./Login.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const ctx = useContext(AuthContext);

  const changeVal = (id, val) => {
    if (message !== "") setMessage("");
    if (id === "email") setEmail(val);
    else setPassword(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setMessage("Email address missing");
      return;
    }
    if (password.trim() === "") {
      setMessage("Password missing");
      return;
    }
    setLoading(true);
    fetch(ctx.backendURL + "auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.loggedIn) {
          ctx.login(email, password);
          props.onClose();
        } else setMessage(res.reason);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMessage("Server Error");
      });
  };

  const handleRegister = () => {
    props.toggleRegister();
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose} title="Login">
      <div className="login-message">{message}</div>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          value={email}
          type="email"
          label="Email"
          placeholder="Enter Registered Email"
          onChange={changeVal}
        />
        <FormInput
          id="password"
          type="password"
          value={password}
          label="Password"
          placeholder="Enter Password"
          onChange={changeVal}
        />
        <button disabled={loading}>
          {loading ? <div className="loading"></div> : "Login"}
        </button>
      </form>
      Not Registered?{" "}
      <span className="register-link" onClick={handleRegister}>
        Register Now!
      </span>
    </Modal>
  );
};

export default Login;
