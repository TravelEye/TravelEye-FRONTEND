import { useState } from "react";
import { CheckListContainer, ItemContainer } from "./style";
import Item from "./Item";
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconComponent } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
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

  // Swal.fire({
  //    title: '정말로 그렇게 하시겠습니까?',
  //    text: '다시 되돌릴 수 없습니다. 신중하세요.',
  //    icon: 'warning',

  //    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
  //    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
  //    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
  //    confirmButtonText: '승인', // confirm 버튼 텍스트 지정
  //    cancelButtonText: '취소', // cancel 버튼 텍스트 지정

  //    reverseButtons: true, // 버튼 순서 거꾸로

  // }).then(result => {
  //    // 만약 Promise리턴을 받으면,
  //    if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

  //       Swal.fire('승인이 완료되었습니다.', '화끈하시네요~!', 'success');
  //    }
  // });
  const handleSubmit = (e) => {
    console.log(value);
    e.preventDefault();
  };
  const handleEditClick = (id) => {
    setEditableId(id === editableId ? null : id);
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
              todo={todo.title}
              completed={todo.completed}
              onClick={() => handleClick(todo.id)}
              onEditClick={() => handleEditClick(todo.id)}
              isEditable={todo.id === editableId}
            />
            <SvgIcon
              component={EditIcon}
              onClick={() => handleEditClick(todo.id)}
            />
            <SvgIcon component={RemoveCircleIcon} />
          </ItemContainer>
        ))}
      </ul>
    </CheckListContainer>
  );
}
export default CheckListPage;
