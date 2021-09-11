import React from "react";
import { createContext, useReducer } from "react";

const UserContext = createContext([{ user: null }, () => {}]);

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user,
      };
    case "UPDATE_USER_DETAILS":
      console.log("updating user detilas");
      return {
        user: { ...state.user, ...action.user },
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
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
