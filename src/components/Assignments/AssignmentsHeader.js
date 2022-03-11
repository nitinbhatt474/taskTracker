import React from "react";

import classes from "./Assignments.module.css";

const AssignmentsHeader = (props) => {
  const { currentType } = props;
  return (
    <header>
      <span className={`${currentType == "i" ? classes["active-type"] : ""}`}>
        <span
          className={classes.type}
          onClick={props.setIncomplete}
          tabIndex={1}
        >
          incomplete
        </span>
      </span>
      <span className={`${currentType == "p" ? classes["active-type"] : ""}`}>
        <span
          className={classes.type}
          onClick={props.setPaymentPending}
          tabIndex={2}
        >
          payment pending
        </span>
      </span>
      <span className={`${currentType == "c" ? classes["active-type"] : ""}`}>
        <span className={classes.type} onClick={props.setComplete} tabIndex={3}>
          complete
        </span>
      </span>
    </header>
  );
};

export default AssignmentsHeader;
