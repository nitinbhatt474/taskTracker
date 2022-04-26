import React from "react";

import classes from "./Options.module.css";

/**
 * Renders a list that displays some options and also integrates handlers onto them.
 * @param {*} props { items } an object that must have its name and its handler.
 */
const Options = (props) => {
  const onClick = (e) => {
    props.handleClick(e.target.innerText);
  };

  document.addEventListener("click", (e) => {
    if (e.target.id !== props.id && e.target.id !== props.buttonId)
      props.setShowOptions(false);
  });

  return (
    <ul className={classes.options} id={props.id}>
      {props.items.map((item) => (
        <li onClick={onClick} key={`${props.id}-${item}`} id={props.id + item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Options;
