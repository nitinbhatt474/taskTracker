import React from "react";
import Modal from "../UI/Modal";

const MoreInfo = (props) => {
  return (
    <Modal
      title={`Details of task ${props.taskName}`}
      onClose={props.onClose}
    ></Modal>
  );
};

export default MoreInfo;
