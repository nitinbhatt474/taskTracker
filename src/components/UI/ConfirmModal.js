import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";

import classes from "./ConfirmModal.module.css";

const ConfirmModal = (props) => {
  const [loading, setLoading] = useState(false);
  const handleConfirm = () => {
    setLoading(true);
    props.handleConfirm();
  };

  useEffect(() => {
    setLoading(false);
  }, [props.reason]);
  return (
    <Modal title={props.title} onClose={props.closeModal}>
      <div>
        <h3>{props.message}</h3>
        <div className={loading ? "loading" : "invalid-message"}>
          {props.reason}
        </div>
        <div className={classes.choiceContainer}>
          <button
            className={classes.btn + " " + classes.no}
            onClick={props.handleCancel}
            disabled={loading}
          >
            &#x1F5D9; No
          </button>
          <button
            className={classes.btn + " " + classes.yes}
            onClick={handleConfirm}
            disabled={loading}
          >
            &#10004; Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
