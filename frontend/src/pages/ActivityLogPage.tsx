// Stores all actions taken by the agents
import React from "react";
import MuiNavigation from "../components/MuiNavigation";
import Content from "../components/Content";
import MuiXDataGrid from "../components/MuiXDataGrid";
import axiosInstance from "../axiosInstance";
import { NGROK_LINK } from "../const";
import { AuditEntry } from "../interfaces";

const ActivityLogPage = () => {
  const [response, setResponse] = React.useState<AuditEntry[]>([]);

  // Pulls audit data from backend
  React.useEffect(() => {
    axiosInstance
      .get(`${NGROK_LINK}/get_audit_log_data`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((response) => {
        setResponse(response.data.audit_data);
        console.log("get_audit_log_data response", response);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  return (
    <>
      <MuiNavigation title="Activity Log" />
      <Content>
        <MuiXDataGrid rows={response} />
      </Content>
    </>
  );
};

export default ActivityLogPage;
