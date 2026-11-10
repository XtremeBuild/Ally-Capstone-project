import { useState, useEffect, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import HomePage from "./pages/SentimentDashPage";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/SignUpPage";
import SentimentDashPage from "./pages/SentimentDashPage";
import ThreadTrackerPage from "./pages/ThreadTrackerPage";
import ActivityLogPage from "./pages/ActivityLogPage";
import { ThemeProvider } from "@emotion/react";
import theme from "../src/Theme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import PrivateRoute from "./PrivateRoute";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import AdminStatsPage from "./pages/AdminStats";
import SettingsPage from "./pages/SettingsPage";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (auth: boolean) => {},
});

function App() {
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // New loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsAuthLoading(false);
      if (user) {
        localStorage.setItem("authToken", user.uid);
      } else {
        localStorage.removeItem("authToken");
      }
    });
    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage onLogin={() => setIsAuthenticated(true)} />,
    },
    { path: "/signup", element: <SignUpPage /> },
    {
      element: <PrivateRoute isAuthenticated={isAuthenticated} />,
      children: [
        { path: "/dash/:threadId", element: <SentimentDashPage /> },
        { path: "/tracker", element: <ThreadTrackerPage /> },
        { path: "/log", element: <ActivityLogPage /> },
        { path: "/admin", element: <AdminStatsPage /> }, // Add Admin Page route
      ],
    },
  ]);

  if (isAuthLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
