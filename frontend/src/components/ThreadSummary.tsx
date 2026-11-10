// Displays summary of thread within the dashboard
import { Typography } from "@mui/material";
import { SummaryResponse } from "../interfaces";

interface ThreadSummaryProps {
  response: SummaryResponse;
}

const ThreadSummary = ({ response }: ThreadSummaryProps) => {
  return (
    <>
      <Typography variant="h6">Brief:</Typography>
      <Typography>{response.summary}</Typography>
    </>
  );
};

export default ThreadSummary;
