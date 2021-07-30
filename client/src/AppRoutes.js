import React, { useEffect } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LeadersPage from "./components/Leaders.page";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./gql/mutations/login.mutations";

function AppRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const [mutateFunction, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    mutateFunction();
  }, []);

  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute path={`${path}/`}>home</PrivateRoute>
      <PrivateRoute path={`${path}/leaders`}>
        <LeadersPage />
      </PrivateRoute>
    </Switch>
  );
}

export default AppRoutes;
