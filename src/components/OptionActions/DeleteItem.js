import React, { useState } from "react";
import ConfirmModal from "../UI/ConfirmModal";

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
  const message = `Are you sure you want to delete the task ${props.name}`;

  return (
    <ConfirmModal
      reason={reason}
      closeModal={closeModal}
      message={message}
      title="Delete Item"
      handleConfirm={handleConfirm}
      handleCancel={closeModal}
    />
  );
};

export default DeleteItem;
