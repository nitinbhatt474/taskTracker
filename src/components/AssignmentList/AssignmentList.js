import React, { useState, useContext } from "react";

import AssignmentListItemWrapper from "./AssignmentListItemWrapper";
import classes from "./AssignmentList.module.css";
import AddButton from "./AddButton";
import AddModal from "./AddModal";

/**
 * Renders the list of assignments if the array passed is not empty, otherwise
 * renders that there are assignments available.
 * @param {*} props { allAssignments, type } - a array of list items and the
 * type of assignments.
 */
const AssignmentList = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);

  console.log(new Date().getMonth());

  const currentType = { i: "incomplete", p: "payment-pending", c: "complete" };
  const list = props.data
    .filter((task) => task.taskType === currentType[props.type])
    .map((task) => {
      return <AssignmentListItemWrapper key={task.taskName} data={task} />;
    });

  const emptyListMessage = `No ${currentType[props.type]} assignments found!`;

  const handleCloseModal = () => setShowAddModal(false);
  const handleOpenModal = () => setShowAddModal(true);
  const addTask = (data) => {
    props.addData(data);
    handleCloseModal();
  };

  return (
    <div className={classes["assignment-list"]}>
      {list.length > 0 ? (
        <ul className={classes.list}>{list}</ul>
      ) : (
        <div className={classes["empty-list"]}>{emptyListMessage}</div>
      )}

      {showAddModal && (
        <AddModal
          onClose={handleCloseModal}
          addTask={addTask}
          currentType={currentType[props.type]}
        />
      )}

      {props.type === "i" && <AddButton onClick={handleOpenModal} />}
    </div>
  );
};

export default AssignmentList;
