import React from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

import close from "../../icons/close.svg";

/**
 *
 * @returns a overlay component that basically reduces the visibility of the background component.
 */
const Overlay = (props) => {
  return (
    <div
      className={`${classes.overlay} ${
        props.invalid ? classes["invalid-overlay"] : ""
      }`}
      onClick={props.onClose}
    ></div>
  );
};

/**
 * Renders the Modal with data passed enclosed within the Modal tag and changes appearance based
 *  on props passed. props other children are optional.
 * @param {*} props {invalid, cancellable, onClose, title}
 */
const ModalData = (props) => {
  return (
    <div className={`${classes.modal} ${props.invalid ? classes.invalid : ""}`}>
      <span className={classes.modalTitle}>{props.title}</span>
      {!props.notCancellable && (
        <img
          className={classes["close-btn"]}
          onClick={props.onClose}
          src={close}
          alt="close"
        />
      )}
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

/**
 *
 * @param {*} props {notCancellable, invalid, onClose, title}, enclose whatever you want to render within the element
 */
const Modal = (props) => {
  return (
    <>
      {reactDom.createPortal(
        <Overlay onClose={props.onClose} invalid={props.invalid} />,
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
