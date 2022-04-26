import React, { useState, useContext, useEffect } from "react";
import EditTask from "../EditTask/EditTask";
import DeleteItem from "../OptionActions/DeleteItem";
import MoreInfo from "../OptionActions/MoreInfo";
import AuthContext from "../store/AuthContext";
import AssignmentListItem from "./AssignmentListItem";
import Modal from "../UI/Modal";

const AssignmentListItemWrapper = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

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
      return newState;
    });
  };

  const handleDoneClick = () => {
    handleOptionClick("done");
  };

  useEffect(() => {
    if (showOptionItem.done) {
      setLoading(true);
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
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          if (res.updated) {
            setDone(true);
            setTimeout(() => {
              props.toggleChanged();
            }, 600);
          } else {
            setLoading(false);
            setShowErrorModal(true);
            setErrorMessage("Unable to update status!");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Server Error! - " + err);
        });
    }
  }, [showOptionItem, ctx, props, doneCategory]);

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
    loading,
    doneCategory,
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
      {showErrorModal && (
        <Modal
          invalid={true}
          onClose={closeErrorModal}
          title="Error while updating status"
        >
          <p>{errorMessage}</p>
        </Modal>
      )}
      <AssignmentListItem {...childProps} />
    </>
  );
};

export default AssignmentListItemWrapper;
