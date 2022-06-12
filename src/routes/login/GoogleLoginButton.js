// import { useState, useEffect } from "react";
import { useGoogleLogin } from "react-google-login";

import googleSvg from "../../assets/icons/google.svg?url";
import { StyledSocialButton } from "./styled";
export default function GoogleLoginButton({ login, clientId }) {
  const { signIn, loaded } = useGoogleLogin({
    onScriptLoadFailure: (wtf) => {
      console.error("google login script load failure", wtf);
    },
    clientId,
    onSuccess: ({ tokenId, ...rest }) => {
      console.info("google oauth success", tokenId, rest);
      login({
        id_token: tokenId,
        type: "google"
      });
    },
    onFailure: (wtf) => {
      console.error("google login failure", wtf);
    }
  });
  const handleGoogleLogin = () => {
    signIn();
  };
  // console.log("google login ", loaded);
  return (
    <StyledSocialButton disabled={!loaded} onClick={handleGoogleLogin}>
      <img className="icon" src={googleSvg} alt="google icon" />
      {loaded ? `Sign in with Google` : `Initailizing`}
    </StyledSocialButton>
  );
}
