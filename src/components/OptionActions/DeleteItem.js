import React, { useContext } from "react";

import Modal from "../UI/Modal";

import classes from "./DeleteItem.module.css";

const DeleteItem = (props) => {
  const ctx = props;

  const closeModal = () => {
    props.onClose("delete");
  };

  const handleConfirm = () => {
    ctx.removeData(props.id);
    closeModal();
  };

  return (
    <Modal title="Delete Task" onClose={closeModal}>
      <div>
        <h3>Are you sure you want to delete the task {props.id}</h3>
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
