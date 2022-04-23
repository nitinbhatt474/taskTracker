import React from "react";

const AuthContext = React.createContext({
  backendURL: "https://task--tracker-backend.herokuapp.com/",
  loggedIn: false,
  email: null,
  password: null,
  /**
   * Logs in user with the provided email and password values
   * @param {string} email
   * @param {string} password
   */
  login: (email, password) => {},

  /**
   * logs-out user out of the app
   */
  logout: () => {},
});

export default AuthContext;
