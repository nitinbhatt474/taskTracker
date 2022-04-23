import React, { useState } from "react";

import Modal from "./components/UI/Modal";
import Assignments from "./components/Assignments/Assignments";

import classes from "./App.module.css";

/**
 * The root component of the whole React app.
 * @returns the App component
 */
function App() {
  const [offline, setOffline] = useState(!navigator.onLine);
  window.addEventListener("offline", () => setOffline(true));
  window.addEventListener("online", () => setOffline(false));

  return (
    <div className={classes.app}>
      <header className={classes.header}>Task Tracker</header>
      {offline && (
        <>
          <Modal invalid={true} notCancellable={true} title="Offline">
            <p>
              You seem to be offline, Please connect to the internet to track
              tasks
            </p>
          </Modal>
        </>
      )}
      <Assignments />
    </div>
  );
}

export default App;
