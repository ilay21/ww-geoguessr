import React from "react";
import { createContext, useReducer } from "react";
import { SWRConfig } from "swr";
import { getFetcher } from "../utils/api";

const UserContext = createContext([{ user: null }, () => {}]);

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      throw new Error();
  }
}

function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { user: null });
  return (
    <UserContext.Provider value={[state, dispatch]}>
      <SWRConfig
        value={{
          fetcher: getFetcher(state.user?.getAuthResponse().id_token),
        }}
      >
        {children}
      </SWRConfig>
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
