// Stakeholder table within dash page
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Chip } from "@mui/material";
import MuiDialog from "./MuiDialog";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Sentiment } from "../interfaces";
import { NGROK_LINK } from "../const";

interface MuiTableProps {
  response: Sentiment[];
}

const MuiTable = ({ response }: MuiTableProps) => {
  const { threadId } = useParams();
  const columns = ["Email", "Sentiment", "Time Received", ""];

  const handleClick = (email: string) => {
    console.log("button press");
    axios
      .post(
        NGROK_LINK + `/open_remind_email_draft`,
        {
          recipient: { email },
          thread_id: { threadId },
          loggedInUser: localStorage.getItem("email"),
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      )
      .then((response) => {
        const urlToOpen = response.data.data;
        console.log("open_remind_email_draft response", response);
        window.open(urlToOpen, "_blank");
      });
  };

  const getChipColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "success";
      case "negative":
        return "error";
      case "neutral":
        return "warning";
      case "No Response":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <>
      <TableContainer
        sx={{ maxHeight: "50vh", overflow: "auto", minHeight: "85vh" }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {response.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Chip
                    label={row.sentiment}
                    color={getChipColor(row.sentiment)}
                  />
                </TableCell>
                <TableCell>{row.responseTime}</TableCell>
                <TableCell>
                  {row.quickAction.toLowerCase() === "detail" && (
                    <MuiDialog label={row.quickAction} email={row.email} />
                  )}
                  {row.quickAction.toLowerCase() === "remind" && (
                    <Button
                      variant="contained"
                      onClick={() => handleClick(row.email)}
                    >
                      {row.quickAction}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MuiTable;
