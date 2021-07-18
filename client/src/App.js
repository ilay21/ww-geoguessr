import logo from "./logo.svg";
import "./App.css";
import StoresContext from "./stores";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./LoginPage";

function App() {
  return (
    <StoresContext>
      <Router>
        <Switch>
          <Route path={"/login"}>
            <LoginPage />
          </Route>
          <PrivateRoute>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          </PrivateRoute>
        </Switch>
      </Router>
    </StoresContext>
  );
}

export default App;
