import React, { useState } from "react";
import AssignmentsHeader from "./AssignmentsHeader";

import classes from "./Assignments.module.css";
import AssignmentList from "../AssignmentList/AssignmentList";
import AssignmentContextProvider from "../store/AssignmentContextProvider";

/**
 * Assignments component that shows the 3 categories of assignments i.e. completed, payment pending and incomplete.
 * The upper-most wrapper of all the assignments category.
 */
const Assignments = () => {
  const [currentType, setCurrentType] = useState("i");
  const list = [];

  const setIncomplete = () => setCurrentType("i");
  const setPaymentPending = () => setCurrentType("p");
  const setComplete = () => setCurrentType("c");

  const headerProps = {
    setComplete,
    setIncomplete,
    setPaymentPending,
    currentType,
  };
  console.log(currentType);

  return (
    <div className={classes.assignments}>
      <AssignmentsHeader {...headerProps} />
      <AssignmentContextProvider>
        <AssignmentList allAssignments={list} type={currentType} />
      </AssignmentContextProvider>
    </div>
  );
};

export default Assignments;
