import React, { useState } from "react";
import DeleteItem from "../OptionActions/DeleteItem";
import MoreInfo from "../OptionActions/MoreInfo";
import AssignmentListItem from "./AssignmentListItem";

const AssignmentListItemWrapper = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [done, setDone] = useState(false);
  const optionItems = ["done", "edit", "more-info", "delete"];

  const initState = {};
  //setting an initial state where all the options are switched on
  optionItems.map((item) => (initState[item] = false));

  const [showOptionItem, setShowOptionItem] = useState(initState);

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

  const handleDoneClick = () => setDone(true);
  const handleItemClick = (e) => {
    if (e.target.id === props.data.taskName) {
      console.log(e.target.id);
    }
  };

  const childProps = {
    ...props,
    showOptions,
    done,
    optionItems,
    toggleOptions,
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
        <DeleteItem id={props.data.taskName} onClose={handleOptionClick} />
      )}
      <AssignmentListItem {...childProps} />
    </>
  );
};

export default AssignmentListItemWrapper;
