import React from "react";
import Modal from "../UI/Modal";

import classes from "./MoreInfo.module.css";

const MoreInfo = (props) => {
  const { data } = props;
  const onClose = () => {
    props.onClose("more-info");
  };

  return (
    <Modal title={`Details of task: "${data.taskName}"`} onClose={onClose}>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Name: </span>
        <span>{data.taskName}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Deadline: </span>
        <span>{data.taskDeadline}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Price: </span>
        <span>&#8377;{data.taskPrice}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Number of Repetitions: </span>
        <span>{data.taskRepetitions}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Description: </span>
        <span>{data.taskDescription}</span>
      </div>
    </Modal>
  );
};

export default MoreInfo;
