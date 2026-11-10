// Recently accessed section in side navigation, stored in local storage
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { RecentlyAccessedThread } from "../interfaces";
import { useNavigate } from "react-router-dom";

const RecentlyAccessed = () => {
  const [recentThreads, setRecentThreads] = React.useState<
    RecentlyAccessedThread[]
  >([]);

  const getRecentlyAccessedThreads = () => {
    return JSON.parse(localStorage.getItem("recentThreads") || "[]");
  };

  React.useEffect(() => {
    const storedThreads = getRecentlyAccessedThreads();
    setRecentThreads(storedThreads);
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = (threadId: number) => {
    navigate(`/dash/${threadId}`);
  };

  return (
    <>
      <Typography
        variant="caption"
        sx={{ paddingTop: "1rem", paddingLeft: "1rem" }}
      >
        Recently Accessed:
      </Typography>
      {recentThreads.length > 0 ? (
        <List>
          {recentThreads.map((thread) => (
            <ListItem disablePadding key={thread.threadId}>
              <ListItemButton
                onClick={() => handleButtonClick(thread.threadId)}
              >
                <ListItemText
                  primary={thread.title}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: "0",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="caption"
          sx={{ paddingTop: "1rem", paddingLeft: "1rem" }}
        >
          No recently accessed threads.
        </Typography>
      )}
    </>
  );
};

export default RecentlyAccessed;

{
  /* <Link to={`/dash/${thread.threadId}`} key={thread.threadId}> */
}
