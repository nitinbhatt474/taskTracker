import React, { useState } from "react";

import Options from "../UI/Options";

import doneIcon from "../../icons/done-icon.png";
import incompleteIcon from "../../icons/incomplete-icon.png";
import classes from "./AssignmentListItem.module.css";

const AssignmentListItem = ({ data }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionItems = ["done", "edit", "more-info", "delete"];

  const toggleOptions = () => setShowOptions((showOptions) => !showOptions);
  const handleOptionClick = (option) => {
    toggleOptions();
    console.log(option);
  };

  return (
    <li className={classes.taskItem}>
      <span className={`${classes.pad} ${classes.taskName}`}>
        <span className={classes.title}>Task Name: </span>
        {data.taskName}
      </span>
      <span className={classes.taskDeadline + " " + classes.pad}>
        <span className={classes.title}>Deadline: </span>
        {data.taskDeadline}
      </span>
      <span className={classes.taskPrice + " " + classes.pad}>
        <span className={classes.title}>Price: </span>
        &#8377; {data.taskPrice}
      </span>
      <span className={classes.taskRepetitions + " " + classes.pad}>
        <span className={classes.title}>Repetitions: </span>
        {data.taskRepetitions}
      </span>
      <div className={classes.sideBtnContainer}>
        <img src={incompleteIcon} className={classes.done} />
        <span className={classes.options} onClick={toggleOptions}>
          &#8942;
        </span>
        {showOptions && (
          <Options
            items={optionItems}
            handleClick={handleOptionClick}
            id={data.taskName}
          />
        )}
      </div>
    </li>
  );
};

export default AssignmentListItem;
