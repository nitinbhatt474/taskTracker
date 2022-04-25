import React from "react";
import Modal from "../UI/Modal";

import classes from "./MoreInfo.module.css";

const MoreInfo = (props) => {
  const { data } = props;
  const onClose = () => {
    props.onClose("more-info");
  };

  return (
    <Modal title={`Details of task: "${data.name}"`} onClose={onClose}>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Name: </span>
        <span>{data.name}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Deadline: </span>
        <span>{data.deadline}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Price: </span>
        <span>&#8377;{data.cost}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Number of Repetitions: </span>
        <span>{data.repetitions}</span>
      </div>
      <div className={classes.info}>
        <span className={classes.keyHeading}>Task Description: </span>
        <span>{data.description}</span>
      </div>
    </Modal>
  );
};

export default MoreInfo;
