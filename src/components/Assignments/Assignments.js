import React, { useState, useContext } from "react";
import AssignmentsHeader from "./AssignmentsHeader";
import AddButton from "../AddTask/AddButton";
import Incomplete from "../AssignmentType/Incomplete";
import AuthContext from "../store/AuthContext";

import classes from "./Assignments.module.css";
import AddModal from "../AddTask/AddModal";
import PaymentPending from "../AssignmentType/PaymentPending";

/**
 * Assignments component that shows the 3 categories of assignments i.e. completed, payment pending and incomplete.
 * The upper-most wrapper of all the assignments category.
 */
const Assignments = () => {
  const [currentType, setCurrentType] = useState("i");
  const [addTask, setAddTask] = useState(false);
  const [changed, setChanged] = useState(false);

  const setIncomplete = () => setCurrentType("i");
  const setPaymentPending = () => setCurrentType("p");
  const setComplete = () => setCurrentType("c");
  const toggleAddTask = () => setAddTask((state) => !state);
  const toggleChanged = () => setChanged((state) => !state);
  const ctx = useContext(AuthContext);

  const headerProps = {
    setComplete,
    setIncomplete,
    setPaymentPending,
    currentType,
  };

  return (
    <div className={classes.assignments}>
      <AssignmentsHeader {...headerProps} />
      {currentType === "i" && (
        <Incomplete changed={changed} toggleChanged={toggleChanged} />
      )}
      {currentType === "p" && (
        <PaymentPending changed={changed} toggleChanged={toggleChanged} />
      )}
      {ctx.loggedIn && <AddButton onClick={toggleAddTask} />}
      {addTask && (
        <AddModal onClose={toggleAddTask} toggleChanged={toggleChanged} />
      )}
    </div>
  );
};

export default Assignments;
