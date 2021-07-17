import React, { useContext } from "react";
import Login from "./Login";
import  { UserContext } from './stores';

export default function LoginPage() {
  const [{ user }, dispatchUser] = useContext(UserContext);
  return (
    <div>
      <Login updateAuthContext={dispatchUser} />
    </div>
  );
}
