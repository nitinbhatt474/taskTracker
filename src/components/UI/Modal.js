import React from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

/**
 *
 * @returns a overlay component that basically reduces the visibility of the background component.
 */
const Overlay = () => {
  return <div className={classes.overlay}></div>;
};

/**
 * Renders the Modal with data passed enclosed within the Modal tag and changes appearance based
 *  on props passed. props other children are optional.
 * @param {*} props {children, invalid, cancellable}
 * @returns
 */
const ModalData = (props) => {
  console.log(props);
  return (
    <div className={`${classes.modal} ${props.invalid ? classes.invalid : ""}`}>
      {!props.notCancellable && (
        <span className={classes["close-btn"]}> &#x1F5D9;</span>
      )}
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

/**
 *
 * @param {*} props {notCancellable, invalid}, enclose whatever you want to render within the element
 */
const Modal = (props) => {
  return (
    <>
      {reactDom.createPortal(
        <Overlay />,
        document.getElementById("overlay-container")
      )}
      {reactDom.createPortal(
        <ModalData {...props}>{props.children}</ModalData>,
        document.getElementById("modal-container")
      )}
    </>
  );
};

export default Modal;
