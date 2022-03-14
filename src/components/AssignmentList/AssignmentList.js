import React, { useState, useContext } from "react";

import AssignmentListItem from "./AssignmentListItem";
import classes from "./AssignmentList.module.css";
import AddButton from "./AddButton";
import AssignmentContext from "../store/AssignmentContext";
import AddModal from "./AddModal";

/**
 * Renders the list of assignments if the array passed is not empty, otherwise
 * renders that there are assignments available.
 * @param {*} props { allAssignments, type } - a array of list items and the
 * type of assignments.
 */
const AssignmentList = (props) => {
  const ctx = useContext(AssignmentContext);
  const [showAddModal, setShowAddModal] = useState(false);

  const list = props.allAssignments.map((assignment) => (
    <AssignmentListItem key={assignment.id} data={assignment} />
  ));

  const currentType = { i: "incomplete", p: "payment-pending", c: "complete" };

  const emptyListMessage = `No ${currentType[props.type]} assignments found!`;

  const handleCloseModal = () => setShowAddModal(false);
  const handleOpenModal = () => setShowAddModal(true);

  console.log(ctx);

  return (
    <div className={classes["assignment-list"]}>
      {list.length > 0 ? (
        <ul>{list}</ul>
      ) : (
        <div className={classes["empty-list"]}>{emptyListMessage}</div>
      )}

      {showAddModal && <AddModal onClose={handleCloseModal} />}

      {props.type === "i" && <AddButton onClick={handleOpenModal} />}
    </div>
  );
};

export default AssignmentList;
