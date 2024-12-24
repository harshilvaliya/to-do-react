const localStorageName = "reactTodo";

export const getTodoLocalStorage = () => {
  const savedData = localStorage.getItem(localStorageName);
  if (!savedData) return [];
  return JSON.parse(savedData);
};

export const addTodoLocalStorage = (task) => {
  localStorage.setItem(localStorageName, JSON.stringify(task));
};
