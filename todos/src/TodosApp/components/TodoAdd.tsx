import { useState } from "react";
import { Fab, styled } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Todo } from "../models/Todo.ts/Todo";
import { TodoModal } from "./TodoModal";

type Props = {
  addTodo: (newTodo: Todo) => void;
};
const RightFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  bottom: 0,
  right: 0,
  margin: 20,
})
export const TodoAdd = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openAddTodoModal = () => {
    setIsOpenModal(true);
  };
  const closeAddTodoModal = () => {
    setIsOpenModal(false);
  };
  const addNewTodo = (title: string) => {
    const newTodo: Todo = {
      title: title,
      done: false,
    };
    props.addTodo(newTodo);
  };
  return (
    <>
      <RightFab color="primary"
      onClick={openAddTodoModal} aria-label="add">
        <AddIcon></AddIcon>
      </RightFab>
      <TodoModal
        open={isOpenModal}
        onClose={closeAddTodoModal}
        defaultText=""
        label="New todo"
        onSubmit={(text) => addNewTodo(text)}
      ></TodoModal>
    </>
  );
};
