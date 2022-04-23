import React, { useContext } from "react";

import Modal from "../UI/Modal";
import AuthContext from "../store/AuthContext";

const Logout = (props) => {
  const ctx = useContext(AuthContext);

  const handleLogout = () => {
    ctx.logout();
    props.onClose();
  };

  return (
    <Modal title="Logout" onClose={props.onClose}>
      <div>Current User</div>
      <div className="logout-username">{ctx.email}</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </Modal>
  );
};

export default Logout;
