import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SvgIcon from "@mui/material/SvgIcon";
import { SubmitButton } from "./style";
import { updateChecklistAPI } from "../../../apis";
function Item({ id, todo, completed, onClick, onEditClick, isEditable }) {
  const [newTodo, setNewTodo] = useState(todo);
  const [newCompleted, setNewCompleted] = useState(completed);
  const handleEdit = (e) => {
    console.log(e.target.value);
    setNewTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    onEditClick(null);
    updateChecklistAPI(id, newTodo, completed); //내용만 바뀐 경우
    e.preventDefault();
  };

  return (
    <li style={{ listStyleType: "none" }}>
      {isEditable ? (
        <form onSubmit={handleSubmit}>
          <input type="text" value={newTodo} onChange={(e) => handleEdit(e)} />
          <SubmitButton type="submit">
            <SvgIcon component={CheckCircleOutlineIcon} />
          </SubmitButton>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={newCompleted}
            onChange={() => {
              onClick(id, todo, newCompleted);
              setNewCompleted(!newCompleted); // Use !newCompleted instead of !completed
            }}
          />

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
