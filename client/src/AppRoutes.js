import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LeadersPage from "./components/Leaders.page";

function AppRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute path={`${path}leaders`}>
        <LeadersPage />
      </PrivateRoute>
    </Switch>
  );
}

export default AppRoutes;
