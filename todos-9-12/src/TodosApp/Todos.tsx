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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Todo, Visibility } from "./models/Todo";
import { useTodosAPI } from "./services/TodosAPI";

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
            <IconButton>
              <Add />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Todos;
