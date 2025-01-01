import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { useState } from "react";
import { addTodoLocalStorage, getTodoLocalStorage } from "./TodoLocalStorage";

export const Todo = () => {
  const [task, setTask] = useState(() => getTodoLocalStorage());
  const [inputValue, setInputValue] = useState({
    id: "",
    content: "",
    checked: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    // to check if the input value is empty
    if (!content) return;

    // to check if the task is already added
    if (task.includes(inputValue)) return;
    const ifTodoContentMatched = task.find(
      (curTask) => curTask.content === content
    );
    if (ifTodoContentMatched) return;

    if (isEditing) {
      const updatedTask = task.map((curTask) =>
        curTask.id === editId ? { ...curTask, content } : curTask
      );
      setTask(updatedTask);
      setIsEditing(false);
      setEditId(null);
    } else {
      setTask((prevTask) => [...prevTask, { id, content, checked }]);
    }
  };

  // add todo to local storage
  addTodoLocalStorage(task);

  // edit todo function
  const handleEditTodo = (content) => {
    const todoToEdit = task.find((curTask) => curTask.content === content);
    if (todoToEdit) {
      setInputValue(todoToEdit);
      setIsEditing(true);
      setEditId(todoToEdit.id);
    }
  };

  // delete todo function
  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  // check todo function
  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTask(updatedTask);
  };

  // handleClearTodoData function
  const handleClearTodoData = () => {
    setTask([]);
  };

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <TodoDate />
      </header>
      <TodoForm
        onAddTodo={handleFormSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <section className="myUnOrdList">
        <ul>
          {task.map((curTask) => {
            return (
              <TodoList
                key={curTask.id}
                data={curTask.content}
                checked={curTask.checked}
                onHandleEditTodo={handleEditTodo}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleCheckedTodo={handleCheckedTodo}
              />
            );
          })}
        </ul>
      </section>
      <section>
        <button className="clear-btn" onClick={handleClearTodoData}>
          Clear ALL
        </button>
      </section>
    </section>
  );
};
