import React, { useState, useContext } from "react";

import Modal from "../UI/Modal";
import FormInput from "../UI/FormInput";
import AuthContext from "../store/AuthContext";

import "./Login.css";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const ctx = useContext(AuthContext);

  const changeVal = (id, val) => {
    if (message !== "") setMessage("");

    if (id === "email") setEmail(val);
    else if (id === "password") setPassword(val);
    else setConfirmPassword(val);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage("Passwords do not match try again!");
      return;
    }

    fetch(ctx.backendURL + "auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.registered) {
          setMessage("Welcome " + email);
          setTimeout(() => {
            ctx.login(email, password);
            props.onClose();
          }, 1000);
        } else setMessage("User with this email already exists");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setMessage("Server Error");
      });
  };

  const handleLogin = () => {
    props.toggleLogin();
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose} title="Register">
      <div className="login-message">{message}</div>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          value={email}
          type="email"
          label="Email"
          placeholder="Enter Email"
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
        <FormInput
          id="confirm-password"
          type="password"
          value={confirmPassword}
          label="Confirm Password"
          placeholder="Enter Password Again"
          onChange={changeVal}
        />
        <button disabled={loading}>
          {loading ? <div className="loading"></div> : "Register"}
        </button>
      </form>
      Registered?{" "}
      <span className="register-link" onClick={handleLogin}>
        Login!
      </span>
    </Modal>
  );
};

export default Register;
