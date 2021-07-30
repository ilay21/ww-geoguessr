import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { UserContext } from "../stores";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { refreshTokenSetup } from "../utils";

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

export default function MainAppBar() {
  const classes = useStyles();
  const [{ user }, dispatchUser] = useContext(UserContext);
  let history = useHistory();

  const onLoginSuccess = (res) => {
    console.log("[Login Success] currentUser:", res);
    refreshTokenSetup(res);
    dispatchUser({ type: "LOGIN", user: res });
    history.push("/app");
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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ThreeDRotation />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          GeoGuessr Dashboard
        </Typography>
        <Button onClick={user ? signOut : signIn} color="inherit">
          {user ? "logout" : "login with google"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
