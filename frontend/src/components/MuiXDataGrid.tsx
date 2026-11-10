// Audit log table
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AuditEntry } from "../interfaces";

interface MuiXDataGridProps {
  rows: AuditEntry[];
}

const MuiXDataGrid = ({ rows }: MuiXDataGridProps) => {
  const columns = [
    { field: "threadId", headerName: "Thread ID" },
    { field: "actionTaken", headerName: "Action Taken", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "affectedUser", headerName: "Affected User", flex: 1 },
    { field: "agent", headerName: "Agent", flex: 1 },
  ];

  // For MUI X Data Grid, each table entry must have an ID associated with it - maps id to index + 1
  const rowsWithId = rows.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  console.log("rows", rows);
  return (
    <>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        disableColumnMenu={true}
        disableRowSelectionOnClick={true}
        slots={{ toolbar: GridToolbar }}
      />
    </>
  );
};

export default MuiXDataGrid;
