import { useEffect, useState } from "react";
import { CheckListContainer, ItemContainer } from "./style";
import Item from "./Item";
import SvgIcon from "@mui/material/SvgIcon";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import { loadChecklistAPI } from "../../apis";
import { SvgIconComponent } from "@mui/icons-material";
import Swal from "sweetalert2";
function CheckListPage() {
  const data = [
    { id: 0, title: "선택 1", completed: true },
    { id: 1, title: "선택 2", completed: false },
    { id: 2, title: "선택 3", completed: true },
    { id: 3, title: "선택 4", completed: false },
  ];
  const [todos, setTodos] = useState(data);
  const [value, setValue] = useState("");
  const [editableId, setEditableId] = useState(null);

  const handleSubmit = (e) => {
    console.log(value);
    e.preventDefault();
  };
  const handleEditClick = (id) => {
    setEditableId(id === editableId ? null : id);
  };
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("삭제 완료", "남은 일정 화이팅해요", "success");
      }
    });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleClick = (id) => {
    console.log(id);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const checklist = await loadChecklistAPI();
        console.log(checklist);
        setTodos(checklist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <CheckListContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="list"
            placeholder={"입력해주세요"}
            onChange={handleChange}
          />
          <button type="submit">
            <span className={"arrowIcon"}>Enter</span>
          </button>
        </div>
      </form>
      <ul>
        {todos.map((todo) => (
          <ItemContainer key={todo.id}>
            <Item
              id={todo.id}
              todo={todo.title}
              completed={todo.completed}
              onClick={() => handleClick(todo.id)}
              onEditClick={() => handleEditClick(todo.id)}
              isEditable={todo.id === editableId}
            />
            {todo.id === editableId ? (
              <></>
            ) : (
              <div>
                <SvgIcon
                  component={EditIcon}
                  onClick={() => handleEditClick(todo.id)}
                />
                <SvgIcon
                  component={RemoveCircleIcon}
                  onClick={() => handleDeleteClick(todo.id)}
                />
              </div>
            )}
          </ItemContainer>
        ))}
      </ul>
    </CheckListContainer>
  );
}
export default CheckListPage;
