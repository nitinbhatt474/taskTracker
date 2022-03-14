import React from "react";

const AssignmentContext = React.createContext({
  fetched: false,
  data: [],
  /**
   * Adds data in the context and the DB.
   * @param {*} data whatever data is to be added in the current state and db
   */
  addData: (data) => {},
});

export default AssignmentContext;
