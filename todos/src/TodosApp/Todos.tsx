import React, { useState, useEffect } from "react";
import { Todo, Visibility } from "./models/Todo.ts/Todo";
import { Tab, Tabs, Container, Typography } from "@mui/material";
import { List, ListItem, IconButton } from "@mui/material";
import { Button } from "@mui/material";
import { useTodoService } from "./services/TodoService";
import { TodoAdd } from "./components/TodoAdd";
import { TodoListItem } from "./components/TodoListItem";
import { TodoModal } from "./components/TodoModal";

const todosFilter = (todos: Todo[]) => {
  return {
    all: todos,
    active: todos.filter((todo) => !todo.done),
    done: todos.filter((todo) => todo.done),
  };
};

const Todos = () => {
  const {
    todos,
    addTodo: add,
    editTodo: edit,
    deleteTodo: deleteT,
  } = useTodoService();

  const [visibility, setVisibility] = useState<Visibility>("all");
  const changeVisibility = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Visibility
  ) => {
    setVisibility(newValue);
  };
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  useEffect(() => {
    setFilteredTodos(todosFilter(todos)[visibility]);
  }, [todos, visibility]);

  const toggleDone = (
    event: React.MouseEvent<HTMLButtonElement>,
    todo: Todo
  ) => {
    const newTodo: Todo = {
      title: todo.title,
      done: !todo.done,
    };
    todo.id && edit(todo.id, newTodo);
  };

  const [editedTodo, setEditedTodo] = useState<Todo>({
    id: 0,
    title: "",
    done: false,
  });
  const [isOpenEditTodoModal, setIsOpenEditTodoModal] = useState(false);
  const closeEditTodoModal = () => {
    setIsOpenEditTodoModal(false);
  };
  const editTodo = (event: React.MouseEvent<HTMLElement>, todo: Todo) => {
    (async () => {
      await setEditedTodo(todo);
      await setIsOpenEditTodoModal(true);
    })();
  };

  const doneEdit = (title: string) => {
    if (!title) return;
    const newTodo: Todo = {
      title: title,
      done: editedTodo.done,
    };
    editedTodo.id && edit(editedTodo.id, newTodo);
    closeEditTodoModal();
  };

  const deleteTodo = (
    event: React.MouseEvent<HTMLButtonElement>,
    todo: Todo
  ) => {
    todo.id && deleteT(todo.id);
    setEditedTodo({ id: 0, title: "", done: false });
  };

  const allDeleteDone = () => {
    setVisibility("all");
  };

  const addTodo = (newTodo: Todo) => {
    add(newTodo);
  };
  return (
    <>
      <Container>
        <Typography align="center" variant="h2">
          todos
        </Typography>
        <Tabs centered value={visibility} onChange={changeVisibility}>
          <Tab value="all" label="ALL" />
          <Tab value="active" label="ACTIVE" />
          <Tab value="done" label="DONE" />
        </Tabs>
        <List>
          {filteredTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              editTodo={(e) => editTodo(e, todo)}
              deleteTodo={(e) => deleteTodo(e, todo)}
              toggleDone={(e) => toggleDone(e, todo)}
            ></TodoListItem>
          ))}
          {visibility === "done" && (
            <ListItem>
              <Button onClick={allDeleteDone} color="error">
                All Delete
              </Button>
            </ListItem>
          )}
        </List>
        <TodoAdd addTodo={addTodo}></TodoAdd>
      </Container>
      <TodoModal
        open={isOpenEditTodoModal}
        onClose={closeEditTodoModal}
        label="Edit todo"
        defaultText={editedTodo.title}
        onSubmit={(text) => doneEdit(text)}
      ></TodoModal>
    </>
  );
};

export default Todos;
