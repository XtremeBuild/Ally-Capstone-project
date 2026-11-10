import {
    AppBar,
    Box,
    Button,
    TextField,
    Toolbar,
    Typography,
    Alert,
  } from "@mui/material";
  import { signUp } from "../firebase";
  import React from "react";
  import { useNavigate, Link } from "react-router-dom";
  
  const SignUpPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState(""); // For confirm password input
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [serverError, setServerError] = React.useState<string | null>(null);

    const navigate = useNavigate();

    const validateInputs = () => {
      const emailIsValid = /^\S+@\S+\.\S+$/.test(email);
      const passwordIsValid = password.length >= 6;
      const passwordsMatch = password === confirmPassword;
  
      setEmailError(!emailIsValid);
      setPasswordError(!passwordIsValid);
      setConfirmPasswordError(!passwordsMatch);
  
      return emailIsValid && passwordIsValid && passwordsMatch;
    };
  
    const handleSignUp = async () => {
      setServerError(null); 
      if (!validateInputs()) return;

      try {
        await signUp(email, password);
        localStorage.setItem("email", JSON.stringify(email));
        navigate("/tracker"); 
      } catch (error) {
        console.error("Error signing up:", error);
        setServerError("An error occurred during sign-up. Please try again.");
      }
    };
  
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
              Sign Up
            </Typography>
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
            Create an Account
          </Typography>
          <Box
            sx={{
              height: "60vh",
              width: "35vw",
              backgroundColor: "#d9d9d9",
              borderRadius: "1rem",
              display: "flex",
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
            helperText={emailError ? "Please enter a valid email address" : ""}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: "white", width: "30vw" }}
          />
          <TextField
            label="Password"
            type="password"
            error={passwordError}
            helperText={passwordError ? "Password must be at least 6 characters" : ""}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: "white", width: "30vw" }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "Passwords do not match" : ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ backgroundColor: "white", width: "30vw" }}
          />

          <Button
            variant="contained"
            onClick={handleSignUp}
            sx={{ backgroundColor: "purple", width: "7rem" }}
          >
            Sign Up
          </Button>

          <Typography variant="body1">
            Already have an account?{" "}
            <Link to="/" style={{ color: "#650360", textDecoration: "none" }}>
              Log in
            </Link>
          </Typography>
          </Box>
        </Box>
      </>
    );
  };
  
  export default SignUpPage;
  