import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { Todo } from "../models/Todo.ts/Todo";

type Props = {
  todo: Todo;
  editTodo: (e: React.MouseEvent<HTMLElement>, todo: Todo) => void;
  deleteTodo: (e: React.MouseEvent<HTMLButtonElement>, todo: Todo) => void;
  toggleDone: (e: React.MouseEvent<HTMLButtonElement>, todo: Todo) => void;
};
export const TodoListItem = (props: Props) => {
  const { todo, editTodo, deleteTodo, toggleDone } = props;
  return (
    <>
      <ListItem
        key={todo.id}
        onClick={(e) => editTodo(e, todo)}
        secondaryAction={
          <IconButton edge="end" onClick={(e) => deleteTodo(e, todo)}>
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        }
        sx={{ py: 0 }}
      >
        <ListItemIcon>
          <Checkbox checked={todo.done} onClick={(e) => toggleDone(e, todo)} />
        </ListItemIcon>
        <ListItemButton>
          <ListItemText primary={todo.title} />
        </ListItemButton>
      </ListItem>
    </>
  );
};
