import React, { useState } from "react";
import AssignmentsHeader from "./AssignmentsHeader";

import classes from "./Assignments.module.css";

/**
 * Assignments component that shows the 3 categories of assignments i.e. completed, payment pending and incomplete.
 * The upper-most wrapper of all the assignments category.
 */
const Assignments = () => {
  const [currentType, setCurrentType] = useState("i");

  const setIncomplete = () => setCurrentType("i");
  const setPaymentPending = () => setCurrentType("p");
  const setComplete = () => setCurrentType("c");
  console.log(currentType);

  const headerProps = {
    setComplete,
    setIncomplete,
    setPaymentPending,
    currentType,
  };

  return (
    <div className={classes.assignments}>
      <AssignmentsHeader {...headerProps} />
    </div>
  );
};

export default Assignments;
