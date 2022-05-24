import React, { useRef, useEffect, useState, useContext } from "react";
import FormInput from "../UI/FormInput";
import Modal from "../UI/Modal";
import AuthContext from "../store/AuthContext";

import validateForm from "./validateTasksForm";
import classes from "./AddModal.module.css";

const AddModal = (props) => {
  const [formState, setFormState] = useState({
    category: "incomplete",
    name: "",
    deadline: "",
    cost: "",
    repetitions: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);

  const ctx = useContext(AuthContext);

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
      setLoading(true);
      fetch(ctx.backendURL + "tasks/add-task", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          email: ctx.email,
          password: ctx.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.added) {
            props.onClose();
            props.toggleChanged();
          } else setInvalidMessage(res.reason);
        })
        .catch((err) => {
          setInvalidMessage("Server Error");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleValueChange = (key, value) => {
    setFormState((prevState) => {
      const newState = { ...prevState };
      let val = value;
      if (key === "price" || key === "repetitions") val = parseInt(value);
      else if (key === "deadline") {
        const date = new Date(value);

        // converting to dd-mm-yyyy format from the default yyyy-mm-dd
        // format of input type date.
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        val = `${date.getDate()}-${month}-${date.getFullYear()}`;
      }
      newState[key] = val;
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
          id="name"
          label="Task Name"
          type="text"
          placeholder="Enter Task Name"
          onChange={handleValueChange}
          value={formState.name}
        />

        <FormInput
          id="deadline"
          label="Deadline Date"
          type="date"
          onChange={handleValueChange}
        />

        <FormInput
          id="cost"
          label="Cost"
          type="number"
          placeholder="Enter the decided price (in &#8377;) for the task."
          onChange={handleValueChange}
          value={formState.cost}
        />

        <FormInput
          id="repetitions"
          label="Repetitions"
          type="number"
          placeholder="The task is done for 1 or more people."
          onChange={handleValueChange}
          value={formState.repetitions}
        />

        <FormInput
          id="comments"
          label="Additional Comments"
          type="text"
          placeholder="Something extra that you have to consider while completing the task."
          onChange={handleValueChange}
          value={formState.comments}
        />
        <button className={classes.btn} disabled={loading}>
          {loading ? <div className="loading"></div> : "Add Task"}
        </button>
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
