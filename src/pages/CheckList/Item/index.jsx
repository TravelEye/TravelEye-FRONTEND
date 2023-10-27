import React, { useState } from "react";

function Item({ todo, completed, onClick, onEditClick, isEditable }) {
  const [newTodo, setNewTodo] = useState(todo);
  const handleSubmit = (e) => {
    console.log(newTodo);
    e.preventDefault();
  };
  const handleEdit = (e) => {
    console.log(e.target.value);
    setNewTodo(e.target.value);
  };
  return (
    <li style={{ listStyleType: "none" }}>
      {isEditable ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => handleEdit(e)}
            onBlur={() => onEditClick(null)}
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <>
          <input type="checkbox" checked={completed} onChange={onClick} />
          <label
            style={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {todo}
          </label>
        </>
      )}
    </li>
  );
}

export default Item;
