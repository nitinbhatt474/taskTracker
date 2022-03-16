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
      dbActions(action.db)
        .removeTask(action.id)
        .catch((err) => console.log(err));
      break;
    case actionsTypes.FETCH:
      newState = {
        ...state,
        fetched: true,
        data: [...action.data],
      };
      break;
    case actionsTypes.TOGGLE_ADD:
      newState = { ...newState, added: false };
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
  const fetchData = (db) => {
    dbActions(db)
      .fetchAllTasks()
      .then((res) => {
        //fetched data successfully
        dataDispatcher({ type: actionsTypes.FETCH, data: res });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addData = (data) => {
    setDb((db) => {
      dataDispatcher({ type: actionsTypes.ADD, data, db });
      fetchData(db);
    });
  };

  const removeData = (id) => {
    setDb((db) => {
      dataDispatcher({ type: actionsTypes.REMOVE, id, db });
      fetchData(db);
    });
  };

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
        fetchData(res);
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
