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
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import configration from "../config/config";

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
    height: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
};

const center = {
    position: "relative",
    top: "50%",
    left: "30%",
};

export default function ResetPassword() {
    const { token } = useParams();
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const vertical = "top";
    const horizontal = "right";
    const navigate = useNavigate();

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

    async function resetSubmit(e) {
        e.preventDefault()

        if (!password || !confirm) {
            setPasswordError('Password is required');
            setConfirmError('confirmPassword is required')
            return;
        }
        if (!confirm) {
            setConfirmError('confirmPassword is required');
            return;
        }
        if (password.length < 4) {
            setPasswordError('Password must be at least 5 characters');
            return;
        }
        if (confirm.length < 4) {
            setConfirmError('confirmPassword must be at least 5 characters');
            return;
        }
        if (password !== confirm) {
            setConfirmError("Passwords don't match");
            return;
        }

        try {
            const response = await axios.post(`${configration.localhostBackend}resetpassword/${token}`, { password });
            const resetdata = response.data
            console.log("resetdata--", resetdata);

            console.log("Reset Token", response.data.message === 'Something went to be wrong');
            const ut = localStorage.getItem("setToken");
            console.log("token", ut);
            if (response.data.message === 'Something went to be wrong') {
                if (ut) {
                    // const tokenPayload = JSON.parse(atob(ut.split('.')[1]));
                    // const tokenExpirationTime = 2 * 60 * 1000; // Token expiration time in milliseconds (2 minutes)
                    // const remainingTime = tokenExpirationTime - (new Date() - new Date(tokenPayload.iat * 1000));

                    const tokenPayload = JSON.parse(atob(ut.split('.')[1])); // Parse the token payload
                    console.log("tokenPayload---", tokenPayload);
                    const currentTime = new Date().getTime();
                    console.log("currentTime---", currentTime);
                    const expirationTime = tokenPayload.exp * 1000;
                    console.log("expirationTime--", expirationTime);

                    if (currentTime > expirationTime) {
                        alert("Your password reset link has expired.");
                        // Redirect or perform additional actions as needed
                        navigate("/");
                    }
                }
                else {
                    alert("Token not found Reset failed.");
                    setPassword('')
                    setConfirm('')
                }

            } else {
                console.log("password", password);
                alert("Password reset successful");
                navigate("/");
            }
            // if (ut) {
            //     const tokenExpirationTime = 2 * 60 * 1000; // Token expiration time in milliseconds (2 minutes)
            //     const remainingTime = tokenExpirationTime - (new Date() - new Date(ut.iat * 1000));
            //     console.log('remainingTime--', remainingTime, tokenExpirationTime);
            //     if (remainingTime > 0) {
            //         setTimeout(() => {
            //             alert("Your password reset link has expired.");
            //             // Redirect or perform additional actions as needed
            //         }, remainingTime);
            //     } 
            // } else {
            //     console.log("password", password);
            //     alert("Password reset successful");
            //     navigate("/");

            // }
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("Reset Failed")
            setPassword('')
            setConfirm('')
        }
    }


    useEffect(() => {
        // expiryTime();
    }, [])


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
                    Failed! Password Does Not Match.
                </Alert>
            </Snackbar>
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
                                    height: "70vh",
                                    minHeight: "500px",
                                    backgroundColor: "#3b33d5",
                                }}
                            >
                                <ThemeProvider theme={darkTheme}>
                                    <Container>
                                        <Box height={35} />
                                        <Box sx={center}>
                                            <Avatar
                                                sx={{ ml: "85px", mb: "4px", bgcolor: "#ffffff" }}
                                            >
                                                <LockOutlinedIcon />
                                            </Avatar>
                                            <Typography component="h1" variant="h5">
                                                Reset Password
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
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value)
                                                            setPasswordError('')
                                                        }}
                                                        id="password"
                                                        autoComplete="new-password"
                                                        error={passwordError !== ''}
                                                        helperText={passwordError}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="confirm"
                                                        label="confirm"
                                                        type="password"
                                                        value={confirm}
                                                        onChange={(e) => {
                                                            setConfirm(e.target.value)
                                                            setConfirmError('')
                                                        }}
                                                        id="confirm"
                                                        autoComplete="new-password"
                                                        error={confirmError !== ''}
                                                        helperText={confirmError}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                                                    <Button
                                                        type="submit"
                                                        onClick={resetSubmit}
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
                                                        Submit
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


