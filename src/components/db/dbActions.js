const dbActions = (db) => {
  const storeName = "Assignments";
  const addTask = (data) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const query = store.put(data);

      query.onsuccess = (event) => resolve(event);
      query.onerror = (event) => reject(event.target.errorCode);
    });
  };

  const fetchAllTasks = () => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const objectStore = transaction.objectStore(storeName);

      const allItems = objectStore.getAll();
      allItems.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  };

  const removeTask = (taskName) => {
    return new Promise((resolve, reject) => {
      const txn = db.transaction(storeName, "readwrite");
      const store = txn.objectStore(storeName);
      const index = store.index("taskName");
      const query = index.getKey(taskName);

      query.onsuccess = (event) => {
        store.delete(event.target.result);
        resolve(true);
      };

      query.onerror = (event) => {
        reject(false);
      };
    });
  };

  return { addTask, fetchAllTasks, removeTask };
};

export default dbActions;
