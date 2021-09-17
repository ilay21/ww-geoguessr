import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Switch,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from "./AppDrawer";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { ScoreboardContext, UserContext } from "../stores";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { refreshTokenSetup } from "../utils";
import AddNewScoreboardDialog from "./AddNewScoreboardDialog";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../gql/queries/user.queries";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppWrapper({ themeType, setThemeType, children }) {
  const classes = useStyles();
  const [{ user: userFromContext }, dispatchUser] = useContext(UserContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isMyBoardsOpen, setIsMyScoreboardsOpen] = useState(false);
  const [isAddScoreboardDialogOpen, setIsAddScoreboardDialogOpen] =
    useState(false);
  const [getUser, { loading, error, data: { getUser: userFromDB } = {} }] =
    useLazyQuery(GET_USER);
  let history = useHistory();
  const [{ scoreboard }] = useContext(ScoreboardContext);

  if (userFromDB && !userFromContext?.initialized) {
    dispatchUser({
      type: "UPDATE_USER_DETAILS",
      user: { ...userFromDB, initialized: true },
    });
  }

  const onLoginSuccess = (res) => {
    console.log("[Login Success] currentUser:", res);
    refreshTokenSetup(res);
    getUser();
    dispatchUser({ type: "LOGIN", user: res });
    history.push("/");
  };
  const onLoginFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };
  const onLogoutSuccess = (res) => {
    console.log("[Logout Success] currentUser:", res);
    dispatchUser({ type: "LOGOUT" });
  };
  const onLogoutFailure = (res) => {
    console.log("[Logout Failed] res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess: onLoginSuccess,
    clientId: process.env.REACT_APP_GOOGLE_API_KEY,
    isSignedIn: true,
    onFailure: onLoginFailure,
  });

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    clientId: process.env.REACT_APP_GOOGLE_API_KEY,
    onFailure: onLogoutFailure,
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon
              onClick={() => {
                setDrawerIsOpen(true);
              }}
            />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GeoGuessr Dashboard
          </Typography>
          {scoreboard?.title && (
            <Chip
              color="primary"
              icon={<DashboardOutlinedIcon />}
              label={
                <Typography variant={"h6"}>
                  "{scoreboard.title}" Scoreboard
                </Typography>
              }
            />
          )}
          <Switch
            checked={themeType === "dark"}
            onChange={() => {
              setThemeType(themeType === "dark" ? "light" : "dark");
            }}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />{" "}
          <Button onClick={userFromContext ? signOut : signIn} color="inherit">
            {userFromContext ? "logout" : "login with google"}
          </Button>
        </Toolbar>
        <AppDrawer
          setIsAddScoreboardDialogOpen={setIsAddScoreboardDialogOpen}
          setDrawerIsOpen={setDrawerIsOpen}
          key={"My Scoreboards"}
          open={drawerIsOpen}
          onClose={() => {
            setDrawerIsOpen(false);
          }}
          onMyScoreboardsClick={() => {
            setIsMyScoreboardsOpen(!isMyBoardsOpen);
          }}
          myBoardsOpen={isMyBoardsOpen}
        />
        <AddNewScoreboardDialog
          open={isAddScoreboardDialogOpen}
          setOpen={setIsAddScoreboardDialogOpen}
        />
      </AppBar>
      {children}
    </>
  );
}
