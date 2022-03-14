import React from "react";

import classes from "./AssignmentListItem.module.css";

const AssignmentListItem = (props) => {
  return <li>{props.name}</li>;
};

export default AssignmentListItem;
