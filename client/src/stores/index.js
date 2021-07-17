import React from "react";
import { UserContextProvider, UserContext } from "./user.store";

function StoresContext({ children }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

export default StoresContext;

export { UserContext };
