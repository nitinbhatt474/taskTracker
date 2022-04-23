import React, { useRef, useEffect, useState } from "react";
import FormInput from "../UI/FormInput";
import Modal from "../UI/Modal";

import validateForm from "./validateTasksForm";
import classes from "./AddModal.module.css";

const AddModal = (props) => {
  const [formState, setFormState] = useState({
    taskType: props.currentType,
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
    } else {
      props.addTask(formState);
    }
  };

  const handleValueChange = (key, value) => {
    setFormState((prevState) => {
      const newState = { ...prevState };
      let val = value;
      if (key === "taskPrice" || key === "taskRepetitions")
        val = parseInt(value);
      else if (key === "taskDeadline") {
        const date = new Date(value);

        // converting to dd-mm-yyyy format from the default yyyy-mm-dd
        // format of input type date.
        val = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }
      newState[key] = val;
      console.log(newState);
      return newState;
    });
  };

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
