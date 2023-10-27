import React from "react";

function Item({ todo, completed, onClick, onEditClick, isEditable }) {
  return (
    <li style={{ listStyleType: "none" }}>
      {isEditable ? (
        <input
          type="text"
          value={todo}
          onChange={(e) => onEditClick(e.target.value)}
          onBlur={() => onEditClick(null)}
        />
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
