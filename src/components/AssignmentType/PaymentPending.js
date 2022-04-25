import React, { useState, useContext, useEffect } from "react";
import AssignmentListItemWrapper from "../AssignmentList/AssignmentListItemWrapper";
import AuthContext from "../store/AuthContext";

import classes from "./AssignmentType.module.css";

const PaymentPending = (props) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  //   const [confirmPayment, setConfirmPayment] = useState(false);
  const ctx = useContext(AuthContext);

  const toggleDelete = () => setDeleted(true);

  useEffect(() => {
    setLoading(true);
    fetch(ctx.backendURL + "tasks/get-tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: ctx.email,
        password: ctx.password,
        category: "payment-pending",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setTasks(res);
      })
      .catch((err) => console.log(err));
  }, [props.changed, ctx]);

  if (!ctx.loggedIn) {
    return <div className={classes.msg}>Please login to see your tasks</div>;
  } else if (loading) return <div className="task-loading"></div>;
  else if (tasks.length === 0) {
    return (
      <div className={classes.msg}>
        No amount due for completed assignments.
      </div>
    );
  }

  const totalAmt = Object.keys(tasks).reduce(
    (amt, task) => amt + parseInt(tasks[task].cost),
    0
  );

  return (
    <>
      <ul className={classes.tasks}>
        {tasks.map((task) => (
          <AssignmentListItemWrapper
            className={deleted ? classes.deleted : ""}
            key={task._id}
            id={task._id}
            data={task}
            toggleDelete={toggleDelete}
            toggleChanged={props.toggleChanged}
          />
        ))}
      </ul>
      <div className={classes.pendingDiv}>
        <span>
          Total Pending Amount:
          <span className={classes.amt}>&#8377;{totalAmt}</span>
        </span>
        <button>Payment Received</button>
      </div>
    </>
  );
};

export default PaymentPending;
