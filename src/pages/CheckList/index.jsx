import { useState } from "react";
import { CheckListContainer } from "./style";

function CheckListPage() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <CheckListContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="list"
            placeholder={"Entering to-do list~!"}
            onChange={handleChange}
          />
          <button>
            <span className={"arrowIcon"}></span>Enter
          </button>
        </div>
      </form>
      <ul>
        {/* {todos.map((todo) => (
          <ToDoListItem todo={todo} key={todo.id} />
        ))} */}
      </ul>
    </CheckListContainer>
  );
}
export default CheckListPage;
