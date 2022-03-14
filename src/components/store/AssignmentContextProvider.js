import React, { useEffect, useReducer } from "react";
import dbConnection from "../db/dbConnection";
import AssignmentContext from "./AssignmentContext";

const dataReducer = (state, action) => {
  if (action.type === "ADD") {
  }
};

const AssignmentContextProvider = (props) => {
  const addData = (data) => {};

  const initState = {
    fetched: false,
    data: [],
    /**
     * Adds data in the context and the DB.
     * @param {*} data whatever data is to be added in the current state and db
     */
    addData,
  };
  const [data, dataDispatcher] = useReducer(dataReducer, initState);

  useEffect(() => {
    let db;
    dbConnection()
      .then((res) => {
        db = res;
        console.log(db);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AssignmentContext.Provider value={data}>
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentContextProvider;
