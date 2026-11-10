// Provides pro/cons for individual stakeholder in modal winow
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DetailsData } from "../interfaces";
import { NGROK_LINK } from "../const";
import { Box, CircularProgress } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface MuiDialogProps {
  label: string;
  email: string;
}

export default function MuiDialog({ label, email }: MuiDialogProps) {
  const [positives, setPositives] = React.useState();
  const [negatives, setNegatives] = React.useState();

  const [attachments, setAttachments] = React.useState<
    { filename: string; content: string }[]
  >([]); // New state for attachments
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);

  const { threadId } = useParams();
  const [response, setResponse] = React.useState<DetailsData>();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    axios
      .get(
        NGROK_LINK +
          `/thread/get_details?thread_id=${threadId}&email_id=${email}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      )
      .then((response) => {
        setPositives(response.data.positives);
        setNegatives(response.data.negatives);
        setAttachments(response.data.attachments); // Set attachments
        setResponse(response.data);
        setIsLoading(false);
        console.log("get_details response", response);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {label}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Email Summary
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        {/* Maps pros and cons, provides loading icon otherwise */}
        <DialogContent dividers sx={{ minHeight: "20vh", minWidth: "20vw" }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "20vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography>Pros:</Typography>
              <ul>
                {response?.positives.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <br />
              <Typography>Cons:</Typography>
              <ul>
                {response?.negatives.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
          <br />
          {/* Maps attachments in the  modal window, bullet point for each*/}
          <Typography>Attachments:</Typography>
          <ul>
            {attachments.length === 0 ? (
              <li>
                <Typography color="textPrimary">None</Typography>
              </li>
            ) : (
              attachments.map((attachment, index) => (
                <li key={index}>
                  <Typography>
                    <strong>{attachment.filename}:</strong> {attachment.content}
                  </Typography>
                </li>
              ))
            )}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            component="a"
            href={response?.webLink}
            target="_blank"
            autoFocus
            onClick={handleClose}
            variant="contained"
          >
            Open in Outlook
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
