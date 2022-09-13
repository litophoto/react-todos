import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, TextField, Button } from "@mui/material";

type Props = {
  open: boolean;
  label: string;
  onSubmit: (event: any, title: string) => void;
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
  const onSubmit = (event: any, title: string) => {
    props.onSubmit(event, title);
    setTitle("");
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <TextField
          autoFocus
          margin="dense"
          label="todo"
          fullWidth
          variant="standard"
          value={title}
          onChange={handleChangeTitle}
        ></TextField>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => onSubmit(e, title)}>
            {props.label}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoDialog;
