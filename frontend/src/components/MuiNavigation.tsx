// Primary top and side navigation of app
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useAdminCheck from "../hooks/useAdminCheck";

import {
  FormatListBulletedRounded,
  ReceiptLongRounded,
  Logout,
  AdminPanelSettingsRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles.css";
import RecentlyAccessed from "./RecentlyAccessed";
import { logOut } from "../firebase"; // Import logOut function from firebase
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface MuiNavProps {
  title: string;
}

export default function MuiNavigation({ title }: MuiNavProps) {
  const navigate = useNavigate();

  // Handle the logout action
  const handleLogout = async () => {
    await logOut(); // Log out from Firebase
    localStorage.clear();
    navigate("/", { replace: true }); // Redirect to login with history cleared
  };

  const { isAdmin, loading } = useAdminCheck();

  if (loading) return null; // Optional loading state or spinner

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#650360",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box
            component="img"
            src="../src/assets/images/ally-white.png"
            sx={{ maxHeight: "40px" }}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f8f8f8",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar></Toolbar>
        <Divider />
        <List>
          <Link
            to="/tracker"
            style={{ textDecoration: "none", color: "inherit  " }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FormatListBulletedRounded />
                </ListItemIcon>
                <ListItemText primary="Thread Tracker" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to={"/log"}
            style={{ textDecoration: "none", color: "inherit  " }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ReceiptLongRounded />
                </ListItemIcon>
                <ListItemText primary="Activity Log" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Admin Page Link */}

          {isAdmin && (
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettingsRounded />
                  </ListItemIcon>
                  <ListItemText primary="Admin Stats" />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
        </List>
        <Divider />

        <RecentlyAccessed />

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: drawerWidth,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "error.main" }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </Box>
  );
}
