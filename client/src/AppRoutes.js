import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MyScoreboard from "./components/MyScoreboard";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./gql/mutations/login.mutations";
import { Grid } from "@material-ui/core";
import { UserContext } from "./stores";

function AppRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN);
  const [{ user }] = useContext(UserContext);

  useEffect(() => {
    if (user && !user?.initialized) {
      loginMutation();
    }
  }, [user]);

  return (
    <Switch>
      <PrivateRoute path={`/my-boards/:scoreboardTitle`}>
        <MyScoreboard />
      </PrivateRoute>
      <Route path={`/`}>
        <Grid container style={{ height: "100vh" }}>
          <Grid item xs></Grid>
        </Grid>
      </Route>
    </Switch>
  );
}

export default AppRoutes;
