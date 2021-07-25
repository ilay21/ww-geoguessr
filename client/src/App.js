import "./App.css";
import StoresContext from "./stores";
import { Route, Switch, HashRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import ApolloClientProvider from "./ApolloClientProvider";
import AppRoutes from "./AppRoutes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <StoresContext>
      <HashRouter>
        <Switch>
          <Route path={"/login"}>
            <LoginPage />
          </Route>
          <PrivateRoute path={"/"}>
            <ApolloClientProvider>
              <AppRoutes />
            </ApolloClientProvider>
          </PrivateRoute>
        </Switch>
      </HashRouter>
    </StoresContext>
  );
}

export default App;
