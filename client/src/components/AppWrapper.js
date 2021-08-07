import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Switch,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import AppDrawer from "./AppDrawer";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState } from "react";
import { UserContext } from "../stores";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { refreshTokenSetup } from "../utils";
import AddNewScoreboardDialog from "./AddNewScoreboardDialog";
import { useQuery } from "@apollo/client";
import { GET_SCOREBOARDS } from "../gql/queries/scoreboard.queries";

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function AppWrapper({ themeType, setThemeType, children }) {
  const classes = useStyles();
  const [{ user }, dispatchUser] = useContext(UserContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isMyBoardsOpen, setIsMyScoreboardsOpen] = useState(false);
  const [isAddScoreboardDialogOpen, setIsAddScoreboardDialogOpen] =
    useState(false);
  let history = useHistory();
  const {
    loading,
    error,
    data: { getScoreboards: scoreboardsData } = {},
  } = useQuery(GET_SCOREBOARDS);

  const onLoginSuccess = (res) => {
    console.log("[Login Success] currentUser:", res);
    refreshTokenSetup(res);
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

  const drawerList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      callback: () => {
        history.push("/");
        setDrawerIsOpen(false);
      },
    },
    {
      text: "Create New Scoreboard",
      icon: <AddIcon />,
      callback: () => {
        setIsAddScoreboardDialogOpen(true);
      },
    },
  ];
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
          <Switch
            checked={themeType === "dark"}
            onChange={() => {
              setThemeType(themeType === "dark" ? "light" : "dark");
            }}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />{" "}
          <Button onClick={user ? signOut : signIn} color="inherit">
            {user ? "logout" : "login with google"}
          </Button>
        </Toolbar>
        <AppDrawer
          key={"My Scoreboards"}
          open={drawerIsOpen}
          onClose={() => {
            setDrawerIsOpen(false);
          }}
          drawerList={drawerList}
          renderListItem={({ text, icon, callback }) => {
            return (
              <ListItem button key={text} onClick={callback}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          }}
          onMyScoreboardsClick={() => {
            setIsMyScoreboardsOpen(!isMyBoardsOpen);
          }}
          myBoardsOpen={isMyBoardsOpen}
          scoreboardsData={scoreboardsData}
          renderMyScoreboardsListItem={(scoreboard) => (
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={scoreboard.title} />
            </ListItem>
          )}
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
