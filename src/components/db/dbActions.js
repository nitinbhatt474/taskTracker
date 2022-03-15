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

  return { addTask, fetchAllTasks };
};

export default dbActions;
