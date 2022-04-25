import React, { useEffect, useState, useContext } from "react";
import FormInput from "../UI/FormInput";
import Modal from "../UI/Modal";
import AuthContext from "../store/AuthContext";

import validateForm from "../AddTask/validateTasksForm";
import classes from "./EditTask.module.css";

const EditTask = (props) => {
  const [formState, setFormState] = useState({
    category: "incomplete",
    name: "",
    deadline: "",
    cost: "",
    repetitions: "",
    comments: "",
  });

  const [updateDoc, setUpdateDoc] = useState({});
  const [loading, setLoading] = useState(false);

  const ctx = useContext(AuthContext);
  const [invalidMessage, setInvalidMessage] = useState("");

  const closeModal = () => props.onClose("edit");

  //set the edit fields
  useEffect(() => {
    setLoading(true);
    fetch(ctx.backendURL + "tasks/find-task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: ctx.email,
        password: ctx.password,
        _id: props._id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFormState(res[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setInvalidMessage("Server Error");
      });
  }, [ctx, props._id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(updateDoc).length === 0) {
      setInvalidMessage("Nothing to update");
      return;
    }
    const [showModal, message] = validateForm(formState);
    if (showModal) {
      setInvalidMessage(message);
    } else {
      setLoading(true);
      fetch(ctx.backendURL + "tasks/update-task", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...updateDoc,
          _id: formState._id,
          email: ctx.email,
          password: ctx.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.updated) {
            setTimeout(() => {
              props.toggleChanged();
            }, 300);
            setLoading(false);
            closeModal();
          } else console.log(res.reason);
        })
        .catch((err) => {
          setInvalidMessage("Server Error");
          setLoading(false);
          console.log(err);
        });
    }
  };

  const handleValueChange = (key, value) => {
    setInvalidMessage("");
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
      setUpdateDoc((state) => {
        const newState = { ...state };
        newState[key] = val;
        return newState;
      });

      return newState;
    });
  };

  return (
    <Modal title="Update Task" onClose={closeModal}>
      <div className={classes["invalid-message"]}>{invalidMessage}</div>
      <form onSubmit={handleFormSubmit}>
        <FormInput
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
          value={formState.deadline.split("-").reverse().join("-")}
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
          {loading ? <div className="loading"></div> : "Update Task"}
        </button>
      </form>
    </Modal>
  );
};

export default EditTask;
