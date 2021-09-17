import "./App.css";
import StoresContext from "./stores";
import { Switch, HashRouter } from "react-router-dom";
import ApolloClientProvider from "./ApolloClientProvider";
import AppRoutes from "./AppRoutes";
import PrivateRoute from "./components/PrivateRoute";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useMemo } from "react";
import AppWrapper from "./components/AppWrapper";
import { SnackbarProvider } from "notistack";

function App() {
  const [themeType, setThemeType] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeType,
          background: {
            default: themeType === "light" ? "#e4f0e2" : "#e4f0e2",
          },
        },
        contrastThreshold: 3,
      }),
    [themeType]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
