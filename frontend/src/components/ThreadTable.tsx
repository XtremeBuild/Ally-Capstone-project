// Displays all the on going decision making threads
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, LinearProgress } from "@mui/material";
import { RecentlyAccessedThread, Thread } from "../interfaces";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ConfirmationAlert from "./ConfirmationAlert";
import EditableTextField from "./EditableTextField";
import { FlagRounded } from "@mui/icons-material";

interface ThreadTableProps {
  threads: Thread[];
}

const ThreadTable = ({ threads }: ThreadTableProps) => {
  const columns = [" ", "Thread ID", "Title", "Date Created", "Status", ""];
  const [open, setOpen] = React.useState(false);

  const defaultThread: Thread = {
    threadId: 0,
    title: "",
    dateCreated: "",
    status: 0,
    priority: false,
  };
  const [deleteThread, setDeleteThread] = React.useState<Thread>(defaultThread);

  const navigate = useNavigate();

  // Adds thread to recently accessed section when clicked on
  const addRecentlyAccessed = (thread: Thread): void => {
    const recentThreads: RecentlyAccessedThread[] = JSON.parse(
      localStorage.getItem("recentThreads") || "[]"
    );

    const existingIndex = recentThreads.findIndex(
      (t) => t.threadId === thread.threadId
    );

    if (existingIndex !== -1) {
      recentThreads.splice(existingIndex, 1);
    }

    recentThreads.unshift({ threadId: thread.threadId, title: thread.title });

    recentThreads.splice(5);

    localStorage.setItem("recentThreads", JSON.stringify(recentThreads));
  };

  console.log(localStorage);

  const handleRowClick = (thread: Thread) => {
    addRecentlyAccessed(thread);

    navigate(`/dash/${thread.threadId}`);
  };

  const handleButtonClick = (event: React.MouseEvent, thread: Thread) => {
    event.stopPropagation();
    setOpen(!open);
    setDeleteThread(thread);
  };

  return (
    <>
      <ConfirmationAlert open={open} setOpen={setOpen} thread={deleteThread} />
      <TableContainer sx={{ overflow: "auto" }}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            {/* Maps each column and row, each thread as one entry in table */}
            <TableRow>
              {columns &&
                columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {threads &&
              threads
                .sort((a, b) => a.threadId - b.threadId)
                .map((thread: Thread) => (
                  <TableRow
                    key={thread.threadId}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleRowClick(thread)}
                  >
                    <TableCell>
                      {thread.priority ? (
                        <FlagRounded color="primary"></FlagRounded>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell>{thread.threadId}</TableCell>

                    <TableCell>
                      <EditableTextField
                        initialText={thread.title}
                        thread_id={thread.threadId}
                      />
                    </TableCell>
                    <TableCell>{thread.dateCreated}</TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={thread.status}
                        color="primary"
                        sx={{ minHeight: ".75rem" }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={(event) => handleButtonClick(event, thread)}
                      >
                        <CloseRoundedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ThreadTable;
