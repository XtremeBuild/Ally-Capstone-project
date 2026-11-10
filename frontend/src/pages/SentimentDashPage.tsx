// Displays all modular windows per thread
import React from "react";
import { Box, CircularProgress, Grid2, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MuiNavigation from "../components/MuiNavigation";
import Content from "../components/Content";
import MuiTable from "../components/MuiTable";
import MuiXChart from "../components/MuiXChart";
import {
  GeneralSentimentData,
  PieChartEntry,
  Sentiment,
  SummaryResponse,
} from "../interfaces";
import { NGROK_LINK } from "../const";
import ProConTabs from "../components/ProConTabs";
import axiosInstance from "../axiosInstance";
import ThreadSummary from "../components/ThreadSummary";
import {
  consensusPromise,
  emailSummaryPromise,
  fullConsensusPromise,
  MuiTablePromise,
  titlePromise,
  updatePromise,
} from "../api/api";

interface SentimentDashProps {
  title: string;
}

const drawerWidth = 240;

const SentimentDashPage = () => {
  const { threadId } = useParams();
  let navigate = useNavigate();
  // Pros cons for all stakeholders
  const [consensusResponse, setConsensusResponse] =
    React.useState<GeneralSentimentData>();

  // Pie chart
  const [fullConsensus, setFullConsensus] = React.useState<PieChartEntry[]>();
  // Thread title
  const [title, setTitle] = React.useState("");
  // Priority and action items
  const [emailSummaryResponse, setEmailSummaryResponse] =
    React.useState<SummaryResponse>();
  // Individual stakeholder responses
  const [MuiTableConsensus, setMuiTableConsensus] =
    React.useState<Sentiment[]>();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setConsensusResponse(undefined);
    setFullConsensus(undefined);
    setTitle("");
    setEmailSummaryResponse(undefined);
    setMuiTableConsensus(undefined);
  }, [threadId]);

  // Refreshes all module windows on update of threadId - supports recently accessed
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get(
          `${NGROK_LINK}/update?thread_id=${threadId}&email=${localStorage.getItem(
            "email"
          )}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        const [
          consensusResponse,
          titleResponse,
          emailSummaryResponse,
          fullConsensusResponse,
          MuiTableConsensus,
        ] = await Promise.all([
          consensusPromise(threadId),
          titlePromise(threadId),
          emailSummaryPromise(threadId),
          fullConsensusPromise(threadId),
          MuiTablePromise(threadId),
        ]);

        setConsensusResponse(consensusResponse.data);
        setTitle(titleResponse.data.title);
        setEmailSummaryResponse(emailSummaryResponse.data);
        setFullConsensus(fullConsensusResponse.data.full_consensus);
        setMuiTableConsensus(MuiTableConsensus.data.consensus as Sentiment[]);
        setLoading(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchData();
  }, [threadId]);

  return (
    <>
      <MuiNavigation title={title} />
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          paddingLeft={`${drawerWidth}px`}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Content>
          <Grid2 container spacing={2} sx={{ padding: "1%" }}>
            {/* Main Table */}
            <Grid2 size={8}>
              <Paper elevation={3}>
                {/* <Button variant="contained">Update</Button> */}

                {MuiTableConsensus && <MuiTable response={MuiTableConsensus} />}
              </Paper>
            </Grid2>
            <Grid2 size={4} container spacing={2}>
              {/* Summary */}
              <Grid2>
                <Paper elevation={3} sx={{ padding: "1rem" }}>
                  {emailSummaryResponse && (
                    <ThreadSummary response={emailSummaryResponse} />
                  )}
                </Paper>
              </Grid2>
              {/* Chart */}
              <Grid2>
                <Paper elevation={3}>
                  {fullConsensus && <MuiXChart response={fullConsensus} />}
                </Paper>
              </Grid2>

              {/* Tabs */}
              <Grid2>
                <Paper elevation={3}>
                  {consensusResponse && (
                    <ProConTabs response={consensusResponse} />
                  )}
                </Paper>
              </Grid2>
            </Grid2>
          </Grid2>
        </Content>
      )}
    </>
  );
};

export default SentimentDashPage;
