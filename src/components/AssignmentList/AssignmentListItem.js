import React, { useEffect, useState } from "react";

import Options from "../UI/Options";

import doneIcon from "../../icons/done-icon.png";
import incompleteIcon from "../../icons/incomplete-icon.png";
import classes from "./AssignmentListItem.module.css";

const AssignmentListItem = (props) => {
  const { data, done } = props;
  const [longPress, setLongPress] = useState(false);
  let touchTimer;
  const swapLoading = window.innerWidth < 700;
  console.log(swapLoading);

  const handleTouchStart = () => {
    touchTimer = setTimeout(() => {
      setLongPress(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimer);
  };

  useEffect(() => {
    if (longPress) {
      props.setShowOptions(true);
      setLongPress(false);
    }
  }, [longPress, props]);

  if (props.loading && swapLoading) {
    return <li className={classes.taskItem + " loading"}></li>;
  }

  return (
    <li
      className={`${classes.taskItem} ${props.deleted ? classes.deleted : ""}`}
      onClick={props.handleItemClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <span className={`${classes.pad} ${classes.taskName}`}>
        <span className={classes.title}>Task Name: </span>
        {data.name}
      </span>
      <span className={classes.pad}>
        <span className={classes.title}>Deadline: </span>
        {data.deadline}
      </span>
      <span className={classes.pad}>
        <span className={classes.title}>Cost: </span>
        &#8377;{data.cost}
      </span>
      <span className={classes.pad}>
        <span className={classes.title}>Repetitions: </span>
        {data.repetitions}
      </span>
      <div className={classes.sideBtnContainer}>
        <div className={props.loading ? classes.loading : ""}>
          <img
            id={data.taskName + "done"}
            src={
              props.doneCategory === "incomplete"
                ? done
                  ? incompleteIcon
                  : doneIcon
                : done
                ? doneIcon
                : incompleteIcon
            }
            className={`${classes.done} ${done ? classes.doneAnimation : ""}`}
            onClick={props.handleDoneClick}
            alt="done-icon"
            style={{ display: `${props.loading ? "none" : "block"}` }}
          />
        </div>
        <span
          className={classes.options}
          id={data._id + "options"}
          onClick={props.toggleOptions}
        >
          &#8942;
        </span>
        {props.showOptions && (
          <Options
            items={props.optionItems}
            handleClick={props.handleOptionClick}
            setShowOptions={props.setShowOptions}
            id={data._id + "optionList"}
            buttonId={data._id + "options"}
          />
        )}
      </div>
    </li>
  );
};

export default AssignmentListItem;
