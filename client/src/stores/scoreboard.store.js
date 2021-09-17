import React from "react";
import { createContext, useReducer } from "react";

const ScoreboardContext = createContext([{ scoreboard: null }, () => {}]);

function reducer(state, action) {
  switch (action.type) {
    case "ENTER_SCOREBOARD":
      return {
        scoreboard: {
          title: action.title,
        },
      };
    default:
      throw new Error();
  }
}

function ScoreboardContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { scoreboard: null });
  return (
    <ScoreboardContext.Provider value={[state, dispatch]}>
      {children}
    </ScoreboardContext.Provider>
  );
}

export { ScoreboardContext, ScoreboardContextProvider };
