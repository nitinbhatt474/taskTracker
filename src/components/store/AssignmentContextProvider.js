import React, { useEffect, useState, useReducer } from "react";

import dbConnection from "../db/dbConnection";
import AssignmentContext from "./AssignmentContext";
import actionsTypes from "./DispatcherActions";
import dbActions from "../db/dbActions";

const dataReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case actionsTypes.ADD:
      console.log(action);
      dbActions(action.db)
        .addTask(action.data)
        .catch((err) => console.log(err));
      break;
    case actionsTypes.REMOVE:
      console.log(action.id);
      break;
    case actionsTypes.FETCH:
      const prevData = state.data;
      newState = {
        ...state,
        fetched: true,
        data: [...prevData, ...action.data],
      };
      break;
    default:
      newState = {
        fetched: false,
        data: [],
        addData: (data) => {},
        removeData: (id) => {},
      };
  }

  return newState;
};

const AssignmentContextProvider = (props) => {
  const [db, setDb] = useState(null);
  const addData = (data) => {
    setDb((db) => {
      dataDispatcher({ type: actionsTypes.ADD, data: data, db });
    });
  };
  const removeData = (id) => {};

  const initState = {
    fetched: false,
    data: [],
    /**
     * Adds data in the context and the DB.
     * @param {*} data whatever data is to be added in the current state and db
     */
    addData,
    /**
     * Removes the data from the context and the DB.
     * @param {*} id, id of the document that is to be deleted.
     */
    removeData,
  };
  const [data, dataDispatcher] = useReducer(dataReducer, initState);

  useEffect(() => {
    dbConnection()
      .then((res) => {
        setDb(res);
        //here res is used instead of db because state is not immediately available right after update.
        dbActions(res)
          .fetchAllTasks()
          .then((res) => {
            console.log(db);
            //fetched data successfully
            dataDispatcher({ type: actionsTypes.FETCH, data: res });
          })
          .catch((err) => {
            console.log(err);
          });
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
