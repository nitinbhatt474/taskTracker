import React, { useState, useContext } from "react";
import AssignmentsHeader from "./AssignmentsHeader";

import classes from "./Assignments.module.css";
import AssignmentList from "../AssignmentList/AssignmentList";
import AssignmentContext from "../store/AssignmentContext";

/**
 * Assignments component that shows the 3 categories of assignments i.e. completed, payment pending and incomplete.
 * The upper-most wrapper of all the assignments category.
 */
const Assignments = () => {
  const [currentType, setCurrentType] = useState("i");

  const setIncomplete = () => setCurrentType("i");
  const setPaymentPending = () => setCurrentType("p");
  const setComplete = () => setCurrentType("c");
  const ctx = useContext(AssignmentContext);

  const headerProps = {
    setComplete,
    setIncomplete,
    setPaymentPending,
    currentType,
  };
  console.log(currentType);
  console.log(ctx);

  return (
    <div className={classes.assignments}>
      <AssignmentsHeader {...headerProps} />
      {ctx.fetched && <AssignmentList type={currentType} />}
    </div>
  );
};

export default Assignments;
