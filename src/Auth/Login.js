import * as React from "react";
import Button from "@mui/material/Button";
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MercedezLogo from '../uploads/MB_logo.png';
import Loading from "../components/Loading";
import AlertMessage from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  updateIsError,
  updateIsLogin,
  getLocations,
  updateEnvironmentMode,
  generateTokenByLogin,
  getUser,
  getAnnouncements,
} from "../utils/app/mainSlice";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
// import SwipeableTextMobileStepper from '../Components/SwipeableTextMobileStepper';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.mainSlice.loading);
  const [openDialogRegisterNew, setDialogRegisterNew] = React.useState(false);
  const isDevelopmentMode = useSelector(
    (state) => state.mainSlice.isDevelopmentMode
  );

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      dispatch(updateEnvironmentMode(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("username") === null || data.get("username") === "") {
      return dispatch(updateIsError("Username is required."));
    } else if (data.get("password") === null || data.get("password") === "") {
      return dispatch(updateIsError("Password is required."));
    }

    let resLogin = await dispatch(
      loginUser({
        Username: data.get("username"),
        Password: data.get("password"),
      })
    );

    if (resLogin.payload !== undefined) {
      let param = {
        data: {
          Username: data.get("username"),
          Role:
            resLogin.payload !== undefined &&
            resLogin.payload !== null &&
            resLogin.payload.length > 0 &&
            resLogin.payload[0].Roles
              ? resLogin.payload[0].Roles
              : "TVADMIN",
        },
      };

      let tokenGenerated = await dispatch(generateTokenByLogin(param));
      if (
        tokenGenerated.payload !== undefined &&
        tokenGenerated.payload !== null &&
        tokenGenerated.payload.length > 0
      ) {
        let params = {
          data: {
            Username: data.get("username"),
            Role:
              resLogin.payload !== undefined &&
              resLogin.payload !== null &&
              resLogin.payload.length > 0 &&
              resLogin.payload[0].Roles
                ? resLogin.payload[0].Roles
                : "TVADMIN",
          },
          token: tokenGenerated.payload,
        };
        let checkNewUser = await dispatch(getUser(params));
        if (checkNewUser.payload.length === 0) {
          return setDialogRegisterNew(true);
        }
        await dispatch(updateIsLogin());
        await dispatch(getAnnouncements(params));
      }
    }
  };

  const handleEvent = async () => {
    return isDevelopmentMode === false
      ? navigate("/MainApp/externaluser")
      : navigate("/externaluser");
  };

  const handleClickCloseOpenDialog = () => {
    setDialogRegisterNew(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        // xs={12}
        // sm={8}
        // md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/design.png)`, // use the image file
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 5,
          minWidth: "50%",

          height: "100vh",
          opacity: ".9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "right",
        }}
      >
        {/* <Stack direction="row" alignItems="right" gap={2} mr={3} >
        <Typography mt={2} sx={{color : '#ffffff', flexGrow: 1,
          textAlign: "left", fontSize: 12}}>
          FAQ <ArrowDropDownIcon sx={{height : 12, weight : 12}} className="clickableHandCursor" onClick={(e)=>{window.open("https://social.cloud.corpintra.net/docs/DOC-506130")}}/>
        </Typography>
        
        </Stack> */}
        <Stack direction="row" alignItems="center" gap={1} m={3}>
          {/* <Typography component="h1" variant="h5" sx={{color : '#ffffff', flexGrow: 1,
              textAlign: "center"}} mb={2}>
            Mercedes-Benz
          </Typography> */}

          {/* <Avatar sx={{ height: "80px", width: "80px", margin: "auto"}}  src={MercedezLogo}>
        </Avatar> */}
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "whitesmoke",
            height: "55vh",
            mt: 4,
            width: "28%",
            position: "absolute",
            borderRadius: "10px",
            marginBottom: "20px",
            opacity: ".9.5",
          }}
        >
          <Typography
            className="pulse"
            mt={0.1}
            sx={{
              paddingBottom: "2px",
              color: "black",
              fontFamily: "MB Corpo S Title",
            }}
          >
            W E L C O M E
          </Typography>
          <Typography
            component="h5"
            variant="h9"
            mt={3}
            sx={{ fontFamily: "MB Corpo S Text " ,fontWeight: "bold",}}
          >
        DIGITAL BOARD
              <ConnectedTvIcon
              className="tv-icon"
              sx={{ fontSize: "3rem", color: "black", paddingLeft:"10px" }}
            ></ConnectedTvIcon>
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            style={{ width: "70%" }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <TextField
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                sx={{ m: 2 }}
                fullWidth
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <TextField
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ m: 2 }}
                fullWidth
              />
            </Stack>
            {/* <Stack direction="row" alignItems="center" gap={1} >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                sx={{ml : 1}}
                label="Remember me"
              />
              </Stack> */}
            <Stack direction="row" alignItems="center" gap={1}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  m: 2,
                  fontFamily: "MB Corpo S Text",
                  bgcolor: "#008DFC",
                  "&:hover": {
                    bgcolor: "rgb(0,98,176)",
                  },
                }}
                fullWidth
              >
                Sign In
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Modal
        DialogContentText={
          "I hereby authorize Mercedes-Benz Group Services Phils., Inc. to collect and process the data indicated herein for the purpose of updating my records with HR and BCM."
        }
        CancelLabel={"No"}
        AcceptLabel={"Yes, I agree"}
        openDialog={openDialogRegisterNew}
        handleClose={handleClickCloseOpenDialog}
        handleAccept={handleEvent}
      />

      <Loading isLoading={isLoading} />
      <AlertMessage />
    </ThemeProvider>
  );
}
