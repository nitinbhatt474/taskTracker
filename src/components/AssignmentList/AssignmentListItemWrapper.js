import React, { useState, useContext } from "react";
import EditTask from "../EditTask/EditTask";
import DeleteItem from "../OptionActions/DeleteItem";
import MoreInfo from "../OptionActions/MoreInfo";
import AuthContext from "../store/AuthContext";
import AssignmentListItem from "./AssignmentListItem";

const AssignmentListItemWrapper = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [done, setDone] = useState(false);
  const optionItems = ["done", "edit", "delete", "more-info"];
  const [deleted, setDeleted] = useState(false);
  const ctx = useContext(AuthContext);

  const initState = {};
  //setting an initial state where all the options are switched on
  optionItems.map((item) => (initState[item] = false));
  let doneCategory = "payment-pending";
  if (props.data.category === "payment-pending") doneCategory = "complete";
  else if (props.data.category === "complete") doneCategory = "incomplete";

  const [showOptionItem, setShowOptionItem] = useState(initState);
  const toggleDeleted = () => {
    setDeleted((state) => !state);
    setTimeout(() => {
      props.toggleChanged();
    }, 1000);
  };

  const toggleOptions = () => {
    setShowOptions((showOptions) => !showOptions);
  };

  const handleOptionClick = (option) => {
    if (showOptions) toggleOptions();
    setShowOptionItem((showOptionItem) => {
      const newState = { ...showOptionItem };
      newState[option] = !newState[option];
      if (option === "done") handleDoneClick();
      return newState;
    });
  };

  const handleDoneClick = () => {
    fetch(ctx.backendURL + "tasks/update-task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: ctx.email,
        password: ctx.password,
        _id: props.data._id,
        category: doneCategory,
      }),
    });
    setDone(true);
  };
  const handleItemClick = (e) => {
    if (e.target.id === props.data.name) {
      console.log(e.target.id);
    }
  };

  const handleItemDelete = async (id) => {
    try {
      const res = await fetch(ctx.backendURL + "tasks/delete-task", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          email: ctx.email,
          password: ctx.password,
        }),
      });

      return res.json();
    } catch (err) {
      return { deleted: false, reason: "Server Error: couldn't delete item" };
    }
  };

  const childProps = {
    ...props,
    showOptions,
    done,
    deleted,
    toggleDeleted,
    optionItems,
    toggleOptions,
    setShowOptions,
    handleOptionClick,
    handleDoneClick,
    handleItemClick,
  };

  return (
    <>
      {showOptionItem["done"] && handleDoneClick()}
      {showOptionItem["more-info"] && (
        <MoreInfo data={props.data} onClose={handleOptionClick} />
      )}
      {showOptionItem["delete"] && (
        <DeleteItem
          id={props.data._id}
          name={props.data.name}
          onClose={handleOptionClick}
          delete={handleItemDelete}
          toggleDeleted={toggleDeleted}
        />
      )}
      {showOptionItem["edit"] && (
        <EditTask
          _id={props.data._id}
          onClose={handleOptionClick}
          toggleChanged={props.toggleChanged}
        />
      )}
      <AssignmentListItem {...childProps} />
    </>
  );
};

export default AssignmentListItemWrapper;
