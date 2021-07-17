import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "./utils";
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { Spin } from "antd";

function Login({ updateAuthContext }) {
  let history = useHistory();
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res);
    refreshTokenSetup(res);
    updateAuthContext({ type: "LOGIN", user: res });
    history.push("/");
  };
  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };
  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    clientId: process.env.REACT_APP_GOOGLE_API_KEY,
    isSignedIn: true,
    onFailure,
  });

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div style={{ paddingTop: 10 }}>
      {!loaded ? (
        <Spin size="large" />
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_API_KEY}
          buttonText={"Login"}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={true}
        />
      )}
    </div>
  );
}

export default Login;
