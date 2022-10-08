import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

type Props = {
  open: boolean;
  label: string;
  onSubmit: (title: string) => void;
  onClose: () => void;
  title: string;
};
const TodoDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  const handleClose = () => {
    props.onClose();
  };

  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  const handleChangeTitle = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };
  const onSubmit = (title: string) => {
    if (!title) return;
    props.onSubmit(title);
    handleClose();
    setTitle("");
  };
  const enterSubmit = (event: any) => {
    if (event.key !== "Enter") return;
    onSubmit(title);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="todo"
            fullWidth
            variant="standard"
            value={title}
            onChange={handleChangeTitle}
            onKeyDown={enterSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => onSubmit(title)}>{props.label}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoDialog;
