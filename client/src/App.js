import "./App.css";
import StoresContext from "./stores";
import { Switch, HashRouter } from "react-router-dom";
import ApolloClientProvider from "./ApolloClientProvider";
import AppRoutes from "./AppRoutes";
import PrivateRoute from "./components/PrivateRoute";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import MainAppBar from "./components/MainAppBar";

function App() {
  const [themeType, setThemeType] = useState("light");

  const theme = createTheme({
    palette: {
      type: themeType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StoresContext>
        <HashRouter>
          <MainAppBar />
          <Switch>
            <PrivateRoute path={"/app"}>
              <ApolloClientProvider>
                <AppRoutes />
              </ApolloClientProvider>
            </PrivateRoute>
          </Switch>
        </HashRouter>
      </StoresContext>
    </ThemeProvider>
  );
}

export default App;
