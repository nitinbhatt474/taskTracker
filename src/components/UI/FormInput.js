import React from "react";
import classes from "./FormInput.module.css";

const FormInput = React.forwardRef((props, ref) => {
  const handleChange = (e) => {
    props.onChange(props.id, e.target.value);
  };
  return (
    <div className={classes["form-input"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={ref} {...props} onChange={handleChange}></input>
    </div>
  );
});

export default FormInput;
