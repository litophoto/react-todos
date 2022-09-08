import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";

type Props = {
  title?: string;
  context?: string;
  open: boolean;
  onClose: () => void;
  defaultText: string;
  label: string;
  onSubmit: (text: string) => void;
};
export const TodoModal = (props: Props) => {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(props.defaultText);
  }, [props.defaultText]);
  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleSubmit = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    props.onSubmit(text);
    props.onClose();
  };
  const handleSubmitOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;
    handleSubmit(event);
  };
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>New Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Add a new Todo with title
          </DialogContentText>
          <TextField
            value={text}
            onChange={changeText}
            onKeyDown={handleSubmitOnEnter}
            fullWidth
            label={props.label}
            variant="standard"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
