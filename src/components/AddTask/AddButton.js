import React from "react";

import classes from "./AddButton.module.css";

const AddButton = (props) => {
  return (
    <button title="add-task" className={classes.button} onClick={props.onClick}>
      +
    </button>
  );
};

export default AddButton;
