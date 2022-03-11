import React, { useEffect, useState } from "react";

import Modal from "./components/UI/Modal";
import Assignments from "./components/Assignments/Assignments";
import classes from "./App.module.css";

/**
 * The root component of the whole React app.
 * @returns the App component
 */
function App() {
  const [dbAvailable, setDbAvailable] = useState(true);
  useEffect(() => {
    if (!("indexedDB" in window)) setDbAvailable(false);
  }, []);
  return (
    <div className={classes.app}>
      <header className={classes.header}>Assignment Tracker</header>
      {!dbAvailable && (
        <>
          <Modal invalid={true} notCancellable={true}>
            <p>
              indexedDB not available, The current version can only work with
              indexedDB. It is recommended to open this in Chrome.
            </p>
          </Modal>
        </>
      )}
      <Assignments />
    </div>
  );
}

export default App;
