// Displays all threads in the table
import React from "react";
import MuiNavigation from "../components/MuiNavigation";
import Content from "../components/Content";
import ThreadTable from "../components/ThreadTable";
import { Paper } from "@mui/material";
import axios from "axios";
import { Thread } from "../interfaces";
import { NGROK_LINK } from "../const";

const ThreadTrackerPage = () => {
  const [response, setResponse] = React.useState<Thread[]>([]);

  // Refreshes all threads on mount
  React.useEffect(() => {
    axios;
    const loggedInUser = localStorage.getItem("email");
    axios
      .get(NGROK_LINK + `/thread/get_threads?email=${loggedInUser}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((response) => {
        setResponse(response.data.threads as Thread[]);
        console.log("get_threads response", response);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  console.log("localStorage", localStorage);
  return (
    <>
      <MuiNavigation title="Thread Tracker" />
      <Content>
        <Paper elevation={3} sx={{ margin: "1%" }}>
          <ThreadTable threads={response} />
        </Paper>
      </Content>
    </>
  );
};

export default ThreadTrackerPage;
