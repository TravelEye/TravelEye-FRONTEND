import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SvgIcon from "@mui/material/SvgIcon";
import { SubmitButton } from "./style";

function Item({ id, todo, completed, onClick, onEditClick, isEditable }) {
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

          <SubmitButton type="submit" onClick={() => onEditClick(null)}>
            <SvgIcon component={CheckCircleOutlineIcon} />
          </SubmitButton>
        </form>
      ) : (
        <>
          <input type="checkbox" checked={completed} onChange={onClick} />
          <label
            style={{
              marginBottom: 0,
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {todo}
          </label>
        </>
      )}
    </li>
  );
}

export default Item;
