import React, { useReducer } from "react";
import AuthContext from "./AuthContext";

const authActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case authActions.LOGIN:
      localStorage.setItem("task-email", action.email);

      return {
        ...state,
        email: action.email,
        password: action.password,
        loggedIn: true,
      };

    case authActions.LOGOUT:
      localStorage.removeItem("task-email");

      return { ...state, email: null, password: null, loggedIn: false };

    default:
      return { ...state };
  }
};

const AuthContextProvider = (props) => {
  const login = (email, password) => {
    dispatch({ type: authActions.LOGIN, email, password });
  };

  const logout = () => {
    dispatch({ type: authActions.LOGOUT });
  };

  const initialState = {
    backendURL: "https://task--tracker-backend.herokuapp.com/",
    // backendURL: "http://localhost:5000/",
    email: localStorage.getItem("task-email"),
    password: localStorage.getItem("task-password"),
    loggedIn: localStorage.getItem("task-email") !== null,
    login,
    logout,
  };

  const [authState, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
