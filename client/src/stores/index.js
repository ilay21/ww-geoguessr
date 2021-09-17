import React from "react";
import { UserContextProvider, UserContext } from "./user.store";
import {
  ScoreboardContextProvider,
  ScoreboardContext,
} from "./scoreboard.store";

function StoresContext({ children }) {
  return (
    <UserContextProvider>
      <ScoreboardContextProvider>{children}</ScoreboardContextProvider>
    </UserContextProvider>
  );
}

export default StoresContext;

export { UserContext, ScoreboardContext };
