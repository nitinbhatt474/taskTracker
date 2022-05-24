import React, { useEffect, useState, useContext } from "react";
import AssignmentListItemWrapper from "../AssignmentList/AssignmentListItemWrapper";
import AuthContext from "../store/AuthContext";

import classes from "./AssignmentType.module.css";

const Incomplete = (props) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const ctx = useContext(AuthContext);

  const toggleDelete = () => setDeleted(true);

  useEffect(() => {
    setLoading(true);
    fetch(ctx.backendURL + "tasks/get-tasks", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: ctx.email,
        password: ctx.password,
        category: "incomplete",
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
  else if (tasks.length === 0 || !tasks) {
    return <div className={classes.msg}>No incomplete tasks present</div>;
  } else if (tasks.hasOwnProperty("valid")) return <ul></ul>;

  return (
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
  );
};

export default Incomplete;
