// Allows for modification of thread titles
import { useState } from "react";
import { TextField, IconButton, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../axiosInstance";

interface EditableTextFieldProps {
  initialText: string;
  thread_id: number;
}

const EditableTextField = ({
  initialText,
  thread_id,
}: EditableTextFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(initialText);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setTempText(text);
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setText(tempText);
    axiosInstance
      .put("/thread/update_title", {
        thread_id: thread_id,
        title: tempText,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isEditing ? (
        <>
          <TextField
            value={tempText}
            onChange={(e) => {
              e.stopPropagation();
              setTempText(e.target.value);
            }}
            variant="outlined"
            size="small"
            onClick={(e) => e.stopPropagation()}
            sx={{ width: `calc(${text.length + 5}ch)` }}
          />
          <IconButton onClick={handleSave} color="primary">
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleCancel} color="secondary">
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <>
          <Typography>{text}</Typography>
          <IconButton onClick={handleEditClick} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default EditableTextField;
