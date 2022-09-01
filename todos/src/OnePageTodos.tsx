import React, { useState, useEffect, useRef } from "react";
import { Todo, Visibility } from "./models/Todo";
import { Box } from "@mui/system";
import { Tab, Tabs, Container, Typography, Modal } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import { AppBar, Toolbar, styled, Fab } from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  MoreHoriz as MoreIcon,
} from "@mui/icons-material";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '75%',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
const todosFilter = (todos: Todo[]) => {
  return {
    all: todos,
    active: todos.filter((todo) => !todo.done),
    done: todos.filter((todo) => todo.done),
  };
};

function OnePageTodos() {
  const url = "http://127.0.0.1:8000/api/v1/todos/";
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const json = await response.json();
      setTodos(json);
    })();
  }, []);

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

  const refAddNewTodoInput = useRef<HTMLDivElement>(null);
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);
  const openAddTodoModal = () => {
    setIsOpenAddTodoModal(true);
    const node = refAddNewTodoInput.current;
    if (node !== null) {
      node.focus();
      console.log('focused')
    }
  };
  const closeAddTodoModal = () => {
    setIsOpenAddTodoModal(false);
  };

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };
  const addNewTodo = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!newTodoTitle) return;

    const newTodo: Todo = {
      title: newTodoTitle,
      done: false,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(async (response) => {
      const responseJson = await response.json();
      setTodos([responseJson, ...todos]);
      setNewTodoTitle("");
      closeAddTodoModal();
    });
  };
  const onEnterAddNewTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    addNewTodo(event);
  };

  const toggleDone = (
    event: React.MouseEvent<HTMLButtonElement>,
    todo: Todo
  ) => {
    const newTodo: Todo = {
      title: todo.title,
      done: !todo.done,
    };
    fetch(url + todo.id + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(async (response) => {
      const responseData = await response.json();
      const newTodos = todos.map((todoItem) => {
        if (todoItem.id === todo.id) return responseData;
        return todoItem;
      });
      setTodos(newTodos);
    });
  };

  const deleteTodo = (
    event: React.MouseEvent<HTMLButtonElement>,
    todo: Todo
  ) => {
    fetch(url + todo.id + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const newTodos = todos.filter((todoItem) => {
        if (todoItem.id === todo.id) return;
        return true;
      });
      setTodos(newTodos);
    });
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
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" onClick={(e) => deleteTodo(e, todo)}>
                  <DeleteIcon color="error"></DeleteIcon>
                </IconButton>
              }
              sx={{ py: 0 }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={todo.done}
                  onClick={(e) => toggleDone(e, todo)}
                />
              </ListItemIcon>
              <ListItemButton>
                <ListItemText primary={todo.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <StyledFab color="secondary" aria-label="add">
              <AddIcon onClick={openAddTodoModal} />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
      <Modal open={isOpenAddTodoModal} onClose={closeAddTodoModal}>
        <Card sx={modalStyle}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">What do you need next?</Typography>
              <IconButton onClick={closeAddTodoModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              value={newTodoTitle}
              onChange={changeTitle}
              onKeyDown={onEnterAddNewTodo}
              inputRef={refAddNewTodoInput}
              sx={{ width: "100%", mt: 3 }}
              id="add-new-todotitle"
              label="New todo"
              variant="outlined"
            />
            <Button
              variant="contained"
              sx={{ mt: 2, width: "100%" }}
              onClick={addNewTodo}
            >
              Add
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default OnePageTodos;
