import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Fab,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Todo, Visibility } from "./models/Todo";
import { useTodosAPI } from "./services/TodosAPI";
import TodoDialog from "./components/TodoDialog";

const todosFilter = (todos: Todo[]) => {
  return {
    all: todos,
    active: todos.filter((todo) => !todo.done),
    done: todos.filter((todo) => todo.done),
  };
};
const Todos = () => {
  const [todos, actions] = useTodosAPI();
  const [visibility, setVisibility] = useState<Visibility>("all");
  const handleChangeVisibility = (
    event: React.SyntheticEvent,
    newVisibility: Visibility
  ) => {
    setVisibility(newVisibility);
  };
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  useEffect(() => {
    setFilteredTodos(todosFilter(todos)[visibility]);
  }, [todos, visibility]);

  const handleChangeChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    const newTodo = {
      title: todo.title,
      done: event.target.checked, // or 'done: !todo.done'
    };
    todo.id && actions.edit(todo.id, newTodo);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addTitle = (newTitle: string) => {
    const newTodo: Todo = {
      title: newTitle,
      done: false,
    };
    actions.add(newTodo);
    setOpen(false);
  };

  const [edited, setEdited] = useState(false);
  const handleEditOpen = () => {
    setEdited(true);
  };
  const handleEditClose = () => {
    setEdited(false);
  };
  const [editedTodo, setEditedTodo] = useState<Todo>();
  const editTodo = (todo: Todo) => {
    handleEditOpen();
    setEditedTodo(todo);
  };
  const doneEdit = (newTitle: string) => {
    if (!editedTodo) return;
    const newTodo: Todo = {
      title: newTitle,
      done: editedTodo.done,
    };
    editedTodo.id && actions.edit(editedTodo.id, newTodo);
  };
  return (
    <>
      <Typography variant="h2" align="center">
        Todos
      </Typography>
      <Tabs centered value={visibility} onChange={handleChangeVisibility}>
        <Tab label="ALL" value="all" />
        <Tab label="ACTIVE" value="active" />
        <Tab label="DONE" value="done" />
      </Tabs>
      <List>
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox
                checked={todo.done}
                onChange={(e) => handleChangeChecked(e, todo)}
              ></Checkbox>
            </ListItemIcon>
            <ListItemButton onClick={() => editTodo(todo)}>
              <ListItemText>{todo.title}</ListItemText>
            </ListItemButton>
            <IconButton
              color="error"
              onClick={() => todo.id && actions.delete(todo.id)}
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {editedTodo && (
        <TodoDialog
          open={edited}
          label="edit"
          onSubmit={doneEdit}
          onClose={handleEditClose}
          title={editedTodo.title}
        />
      )}

      <Fab onClick={handleOpen}>
        <Add />
      </Fab>
      <TodoDialog
        open={open}
        label="add"
        onSubmit={addTitle}
        onClose={handleClose}
        title=""
      />
    </>
  );
};

export default Todos;
