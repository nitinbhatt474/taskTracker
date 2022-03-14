const dbConnection = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("assignmentsDB", 1);

    request.onerror = (event) => {
      reject(event.target.errorCode);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      //create the assignments store.
      const store = db.createObjectStore("Assignments", {
        autoIncrement: true,
      });

      //create an index on task name.
      const index = store.createIndex("taskName", "taskName", {
        unique: true,
      });

      resolve(db);
    };
    request.onsuccess = (event) => {
      //TODO: whatever task we need to do.
      console.log("Connected to assignmentsDB");
      resolve(event.target.result);
    };
  });
};

export default dbConnection;
