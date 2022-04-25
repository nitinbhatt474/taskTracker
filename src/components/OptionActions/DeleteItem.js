import React, { useState } from "react";

import Modal from "../UI/Modal";

import classes from "./DeleteItem.module.css";

const DeleteItem = (props) => {
  const [reason, setReason] = useState("");
  const closeModal = () => {
    props.onClose("delete");
  };

  const handleConfirm = () => {
    props.delete(props.id).then((res) => {
      console.log(res);
      if (res.deleted) {
        props.toggleDeleted();
        closeModal();
      } else setReason(res.reason);
    });
  };

  return (
    <Modal title="Delete Task" onClose={closeModal}>
      <div>
        <h3>Are you sure you want to delete the task {props.name}</h3>
        <div>{reason}</div>
        <div className={classes.choiceContainer}>
          <button
            className={classes.btn + " " + classes.no}
            onClick={closeModal}
          >
            &#x1F5D9; No
          </button>
          <button
            className={classes.btn + " " + classes.yes}
            onClick={handleConfirm}
          >
            &#10004; Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItem;
