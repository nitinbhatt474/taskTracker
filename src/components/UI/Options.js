import React from "react";

import classes from "./Options.module.css";

/**
 * Renders a list that displays some options and also integrates handlers onto them.
 * @param {*} props { items } an object that must have its name and its handler.
 */
const Options = ({ items, handleClick, id }) => {
  const onClick = (e) => {
    handleClick(e.target.innerText);
  };
  return (
    <ul className={classes.options}>
      {items.map((item) => (
        <li onClick={onClick} key={`${id}${item}`}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Options;
