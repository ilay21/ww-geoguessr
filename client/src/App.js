import "./App.css";
import StoresContext from "./stores";
import { Switch, HashRouter } from "react-router-dom";
import ApolloClientProvider from "./ApolloClientProvider";
import AppRoutes from "./AppRoutes";
import PrivateRoute from "./components/PrivateRoute";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import AppWrapper from "./components/AppWrapper";
import { SnackbarProvider } from "notistack";

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
          <SnackbarProvider maxSnack={3}>
            <ApolloClientProvider>
              <AppWrapper setThemeType={setThemeType} themeType={themeType}>
                <AppRoutes />
              </AppWrapper>
            </ApolloClientProvider>
          </SnackbarProvider>
        </HashRouter>
      </StoresContext>
    </ThemeProvider>
  );
}

export default App;
