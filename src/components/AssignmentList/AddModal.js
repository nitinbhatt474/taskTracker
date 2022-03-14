import React, { useRef, useEffect, useState } from "react";
import FormInput from "../UI/FormInput";
import Modal from "../UI/Modal";

import validateForm from "./validateTasksForm";
import classes from "./AddModal.module.css";

const AddModal = (props) => {
  const [formState, setFormState] = useState({
    taskName: null,
    taskDeadline: null,
    taskPrice: null,
    taskRepetitions: null,
    additionalComments: null,
  });

  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  const firstRef = useRef(null);

  useEffect(() => {
    firstRef.current.focus();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const [showModal, message] = validateForm(formState);
    if (showModal) {
      setShowInvalidModal(showModal);
      setInvalidMessage(message);
    }
  };

  const handleValueChange = (key, value) => {
    setFormState((prevState) => {
      if (key === "taskPrice" || key === "taskRepetitions")
        value = parseInt(value);
      const newState = { ...prevState };
      newState[key] = value;
      return newState;
    });
  };

  console.log(formState);

  const hideInvalidModal = () => {
    setShowInvalidModal(false);
    setInvalidMessage("");
  };

  return (
    <Modal title="Add Task" onClose={props.onClose}>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          ref={firstRef}
          id="taskName"
          label="Task Name"
          type="text"
          placeholder="Enter Task Name"
          onChange={handleValueChange}
        />

        <FormInput
          id="taskDeadline"
          label="Deadline Date"
          type="date"
          placeholder="Enter Task Name"
          onChange={handleValueChange}
        />

        <FormInput
          id="taskPrice"
          label="Price"
          type="number"
          placeholder="Enter the decided price (in &#8377;) for the task."
          onChange={handleValueChange}
        />

        <FormInput
          id="taskRepetitions"
          label="Repetitions"
          type="number"
          placeholder="The task is done for 1 or more people."
          onChange={handleValueChange}
        />

        <FormInput
          id="additionalComments"
          label="Additional Comments"
          type="text"
          placeholder="Something extra that you have to consider while completing the task."
          onChange={handleValueChange}
        />
        <button className={classes.btn}>Add</button>
      </form>
      {showInvalidModal && (
        <Modal onClose={hideInvalidModal} invalid={true} title="Invalid Input">
          {invalidMessage}
        </Modal>
      )}
    </Modal>
  );
};

export default AddModal;
