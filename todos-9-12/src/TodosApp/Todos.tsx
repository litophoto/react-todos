import React, { useState } from "react";
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

const Todos = () => {
  const [todos, actions] = useTodosAPI();
  const [visibility, setVisibility] = useState<Visibility>("all");
  const handleChangeVisibility = (
    event: React.SyntheticEvent,
    newVisibility: Visibility
  ) => {
    setVisibility(newVisibility);
  };

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
  const addTitle = (event: any, newTitle: string) => {
    const newTodo: Todo = {
      title: newTitle,
      done: false,
    };
    actions.add(newTodo);
    setOpen(false);
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
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox
                checked={todo.done}
                onChange={(e) => handleChangeChecked(e, todo)}
              ></Checkbox>
            </ListItemIcon>
            <ListItemButton>
              <ListItemText>{todo.title}</ListItemText>
            </ListItemButton>
            <IconButton color="error" onClick={() => actions.delete(todo.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
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
