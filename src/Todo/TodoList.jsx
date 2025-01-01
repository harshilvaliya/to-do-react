import { MdCheck, MdDeleteForever, MdEdit } from "react-icons/md";

export const TodoList = ({
  data,
  checked,
  onHandleEditTodo,
  onHandleCheckedTodo,
  onHandleDeleteTodo,
}) => {
  return (
    <li className="todo-item">
      <span className={checked ? "checkList" : "notCheckList"}>{data}</span>
      <button className="edit-btn" onClick={() => onHandleEditTodo(data)}>
        <MdEdit />
      </button>
      <button className="check-btn" onClick={() => onHandleCheckedTodo(data)}>
        <MdCheck />
      </button>
      <button className="delete-btn" onClick={() => onHandleDeleteTodo(data)}>
        <MdDeleteForever />
      </button>
    </li>
  );
};
