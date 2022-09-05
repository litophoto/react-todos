import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

type Props = {
  open: boolean;
  onClose: () => void;
  defaultText: string;
  label: string;
  onSubmit: () => void;
};
export const TodoModal = (props: Props) => {
  const [text, setText] = useState(props.defaultText);
  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleSubmit = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    props.onSubmit();
  };
  const handleSubmitOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;
    handleSubmit(event);
  };
  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <Card sx={modalStyle}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">What do you need next?</Typography>
              <IconButton onClick={props.onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              value={text}
              onChange={changeText}
              onKeyDown={handleSubmitOnEnter}
              sx={{ width: "100%", mt: 3 }}
              label={props.label}
              variant="outlined"
            />
            <Button
              variant="contained"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};
