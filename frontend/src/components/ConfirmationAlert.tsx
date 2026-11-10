// Delete thread confirmation popup
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { RecentlyAccessedThread, Thread } from "../interfaces";
import { NGROK_LINK } from "../const";
import { useNavigate } from "react-router-dom";

interface ConfirmationAlertProps {
  open: boolean;
  setOpen: any;
  thread: Thread;
}
export default function ConfirmationAlert({
  open,
  setOpen,
  thread,
}: ConfirmationAlertProps) {
  const handleClick = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  // Deleted threads should also be removed from local storage, no longer represented in the "recently accessed"
  const removeThreadFromLocalStorage = () => {
    let recentThreads: RecentlyAccessedThread[] = JSON.parse(
      localStorage.getItem("recentThreads") || "[]"
    );
    recentThreads = recentThreads.filter(
      (recentThread: RecentlyAccessedThread) =>
        recentThread.threadId !== thread.threadId
    );
    localStorage.setItem("recentThreads", JSON.stringify(recentThreads));
  };

  const deleteThread = () => {
    axios
      .delete(`${NGROK_LINK}/thread/delete_thread`, {
        params: {
          thread_id: thread.threadId,
          email: localStorage.getItem("email"),
        },
      })
      .then((response) => {
        console.log("Thread deleted successfully:", response.data);
        handleClick();
        removeThreadFromLocalStorage();
        navigate(0);
      })
      .catch((error) => {
        console.error("Error deleting thread:", error);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Untrack"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to untrack thread: {thread.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} variant={"outlined"}>
            Cancel
          </Button>
          <Button
            onClick={() => deleteThread()}
            autoFocus
            variant={"contained"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
