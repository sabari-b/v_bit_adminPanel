import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/signin.svg";
import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configration from "../config/config";
import { red } from "@mui/material/colors";
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { Icon } from 'react-icons-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

export default function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    // console.log("validationErrors=====",);
    try {
      if (!email) {
        validationErrors.email = 'Email is required';

      } else if (!isValidEmail(email)) {
        validationErrors.email = 'Invalid email format';

      }

      if (!password) {
        validationErrors.password = 'Password is required';

      } else if (!isValidPassword(password)) {
        validationErrors.password = 'Password must be at least 8 characters with Captial letters, special characters, and numbers';
      }
    

      setLoginError(validationErrors)

      if (Object.keys(validationErrors).length > 0) {
        setLoginError(validationErrors);
      } else {
        // console.log(")___", email, password);

        const response = await axios.post(`${configration.localhostBackend}login`,
          { email, password },

        );
        // console.log("9====", response.data);
        const { token } = response.data;
        if (token && response.data.status === true) {
          // console.log("----------------", token);
          localStorage.setItem("token", token);
          // alert("Login successful...");
          toast.success("Login Successful");
          setTimeout(() => {
            navigate("/dashboard"); 
          }, 5000)
          
        } else {
          toast.warn("Please check your password");
          // setLoginError(validationErrors);
        }

      }
    } catch (error) {
      toast.error('please Check your Email or Password');
    }


  };

  const togglePasswordVisibility = (password) => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!#%*?&.,])[A-Za-z\d@$#!%*?&,.]{8,}$/.test(password);
  };



  useEffect(() => {
    const gettoken = localStorage.getItem("token")
    { gettoken ? navigate('/dashboard') : navigate("/") }
  }, [])


  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    new FormData(event.currentTarget);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct email and password.
        </Alert>
      </Snackbar>
       <ToastContainer />

      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6} style={{
                backgroundColor: "#fff",
              }}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "75vh",
                  minHeight: "500px",
                  backgroundColor: "#3b33d5",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container >
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        <a>Sign In</a>
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setLoginError((prevErrors) => ({ ...prevErrors, email: "" }))
                            }}
                            autoComplete="email"
                          />
                          <span style={{ color: "red" }}> {loginError.email && <p>{loginError.email}</p>}</span>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }} >
                          <div className="d-flex align-items-center">
                          <TextField
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setLoginError((prevErrors) => ({ ...prevErrors, password: "" }))
                            }}
                            autoComplete="new-password"
                            className="password-child-tag"
                            style={{ cursor: 'pointer' }} 
                          />

                          <span style={{ cursor: 'pointer' }} className="flex justify-around items-center items-new-content" onClick={togglePasswordVisibility}>
                            <Icon className="absolute mr-6" icon={showPassword ? eye : eyeOff} size={20} style={{ cursor: 'pointer' }} />
                          </span>
                          </div>
                          <span style={{ color: "red" }}> {loginError.password && <p>{loginError.password}</p>}</span>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              onClick={() => {
                                navigate("/forgot-password");
                              }}
                              style={{ marginTop: "10px", cursor: "pointer" }}
                            >
                              Forgot password?
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            onClick={handleLoginSubmit}
                            variant="contained"
                            fullWidth="true"
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Sign in
                          </Button>
                         

                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
