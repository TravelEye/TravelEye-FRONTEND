import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SvgIcon from "@mui/material/SvgIcon";
import { SubmitButton } from "./style";
import { updateChecklistAPI } from "../../../apis";
function Item({ id, todo, completed, onClick, onEditClick, isEditable }) {
  const [newTodo, setNewTodo] = useState(todo);

  const handleEdit = (e) => {
    console.log(e.target.value);
    setNewTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newTodo);
    updateChecklistAPI(id, newTodo, completed); //내용만 바뀐 경우
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
