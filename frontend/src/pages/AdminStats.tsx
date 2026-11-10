import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { PieChartEntry } from "../interfaces";
import { NGROK_LINK } from "../const";
import MuiNavigation from "../components/MuiNavigation";
import Content from "../components/Content";

const AdminStatsPage = () => {
  const [trackedThreads, setTrackedThreads] = useState(0);
  const [sentimentDistribution, setSentimentDistribution] = useState<
    PieChartEntry[]
  >([]);
  const [activityLogCount, setActivityLogCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [totalFirebaseUsers, setTotalFirebaseUsers] = useState(0);
  const [activityLogInsights, setActivityLogInsights] = useState<
    Record<string, number>
  >({});
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  const [avgResponseTimes, setAvgResponseTimes] = useState<number | null>(null);
  const [monthlyActiveUsers, setMonthlyActiveUsers] = useState(0); // New state for monthly active users

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //console.log("AdminStatsPage useEffect triggered");

    const fetchData = async () => {
      try {
        const [
          threadsRes,
          sentimentRes,
          logCountRes,
          recentRes,
          firebaseUsersRes,
          logInsightsRes,
          newUsersRes,
          avgResponseTimeRes,
          monthlyActiveUsersRes,
        ] = await Promise.all([
          axios.get(`${NGROK_LINK}/tracked-threads`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/sentiment-distribution`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/activity-log-count`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/recent-activity`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/total-firebase-users`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/activity-log-insights`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/new-users-this-month`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/average-response-time`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${NGROK_LINK}/monthly-active-users`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
        ]);

        // console.log("Tracked Threads Response:", threadsRes.data);
        // console.log("Sentiment Distribution Response:", sentimentRes.data);
        // console.log("Activity Log Count Response:", logCountRes.data);
        // console.log("Recent Activity Response:", recentRes.data);

        setTrackedThreads(threadsRes.data.tracked_threads);

        const sentimentData = [
          {
            id: 0,
            label: "Positive",
            value: sentimentRes.data.sentiment_distribution["Positive"] || 0,
          },
          {
            id: 1,
            label: "Negative",
            value: sentimentRes.data.sentiment_distribution["Negative"] || 0,
          },
          {
            id: 2,
            label: "Neutral",
            value: sentimentRes.data.sentiment_distribution["Neutral"] || 0,
          },
          {
            id: 3,
            label: "No Consensus",
            value:
              sentimentRes.data.sentiment_distribution["No Consensus"] || 0,
          },
        ];

        setSentimentDistribution(sentimentData);
        setActivityLogCount(logCountRes.data.activity_log_count);
        setRecentActivity(Array.isArray(recentRes.data) ? recentRes.data : []);
        setTotalFirebaseUsers(firebaseUsersRes.data.total_firebase_users);
        setActivityLogInsights(logInsightsRes.data.action_counts || {});
        setNewUsersThisMonth(newUsersRes.data.new_users_this_month);
        setAvgResponseTimes(
          avgResponseTimeRes.data.average_response_time || null
        );
        setMonthlyActiveUsers(monthlyActiveUsersRes.data.monthly_active_users); // Set monthly active users data
        //console.log("Sentiment Data", sentimentData)
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // if (error) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "red" }}>
  //       <Typography variant="h6">{error}</Typography>
  //     </Box>
  //   );
  // }

  return (
    <>
      <MuiNavigation title="Admin Statistics" />
      <Content>
        <Box sx={{ padding: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h4">{totalFirebaseUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">New Users This Month</Typography>
                  <Typography variant="h4">{newUsersThisMonth}</Typography>
                </CardContent>
              </Card>
            </Grid> */}
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Monthly Active Users</Typography>
                  <Typography variant="h4">
                    {monthlyActiveUsers}
                  </Typography>{" "}
                  {/* Display Monthly Active Users */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Tracked Threads</Typography>
                  <Typography variant="h4">{trackedThreads}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Activity Log Count</Typography>
                  <Typography variant="h4">{activityLogCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Sentiment Distribution</Typography>
                  {sentimentDistribution.length > 0 ? (
                    <PieChart
                      colors={["#4CAF50", "#F44336", "#FF9800", "#E0E0E0"]} // Green, Red, Yellow, Grey
                      series={[
                        {
                          data: sentimentDistribution,
                          innerRadius: 50,
                        },
                      ]}
                      width={400}
                      height={200}
                    />
                  ) : (
                    <Typography>No sentiment data available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {" "}
                    Average Response Time (hours)
                  </Typography>
                  <Typography variant="h4">
                    {avgResponseTimes !== null ? avgResponseTimes : "No data"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Activity Log Insights</Typography>
                  {Object.keys(activityLogInsights).length > 0 ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Action</TableCell>
                          <TableCell>Count</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(activityLogInsights).map(
                          ([action, count], index) => (
                            <TableRow key={index}>
                              <TableCell>{action}</TableCell>
                              <TableCell>{count}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography>No activity log insights available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Recent Activity Logs</Typography>
                  {recentActivity.length > 0 ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User Email</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentActivity.map((log, index) => (
                          <TableRow key={index}>
                            <TableCell>{log.user_email}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>
                              {new Date(log.date).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography>No recent activity available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Content>
    </>
  );
};

export default AdminStatsPage;
