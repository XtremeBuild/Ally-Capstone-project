// Login functionality powered by firebase
import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
  Alert,
} from "@mui/material";
import { logIn } from "../firebase";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const navigate = useNavigate();

  // Validate email and password inputs
  const validateInputs = () => {
    const emailIsValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordIsValid = password.length >= 6;

    setEmailError(!emailIsValid);
    setPasswordError(!passwordIsValid);

    return emailIsValid && passwordIsValid;
  };

  const handleLogin = async () => {
    setServerError(null);
    if (!validateInputs()) return;

    try {
      let authToken = await logIn(email, password);
      console.log("authToken response", authToken);
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("authToken", JSON.stringify(authToken));
      console.log(authToken);
      navigate("/tracker");
    } catch (error) {
      console.error("Login error:", error);
      setServerError("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]); // dependencies include email and password for the latest values

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#650360",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Login
          </Typography>
          <Box
            component="img"
            src="../src/assets/images/ally-white.png"
            sx={{ maxHeight: "40px" }}
          />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={"bold"}
          color="#650360"
          sx={{ padding: "1rem" }}
        >
          Agentic Collaborator
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "60vh",
              width: "35vw",
              backgroundColor: "#d9d9d9",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">Sign In</Typography>
            <Typography variant="h6">
              Login using outlook credentials
            </Typography>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {serverError && (
                <Alert severity="error" sx={{ width: "30vw" }}>
                  {serverError}
                </Alert>
              )}
              <TextField
                label="Email"
                error={emailError}
                helperText={
                  emailError ? "Please enter a valid email address" : ""
                }
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: "white", width: "30vw" }}
              />
              <TextField
                label="Password"
                type="password"
                error={passwordError}
                helperText={
                  passwordError ? "Password must be at least 6 characters" : ""
                }
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: "white", width: "30vw" }}
              />
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{ backgroundColor: "purple", width: "7rem" }}
              >
                Submit
              </Button>
              <Typography variant="body1">
                New user?{" "}
                <Link to="/signup" style={{ color: "purple" }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              height: "60vh",
              width: "35vw",
              backgroundColor: "#650360",
              borderRadius: "1rem",
            }}
          ></Box>
        </Box>
      </Box>
    </>
  );
};

export default AuthPage;
