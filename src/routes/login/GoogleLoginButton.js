// import { useState, useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import { googleClientID } from "../../app/config";
import googleSvg from "../../assets/icons/google.svg?url";
import { StyledSocialButton } from "./styled";
export default function GoogleLoginButton({ login }) {
  const { signIn, loaded } = useGoogleLogin({
    onScriptLoadFailure: (wtf) => {
      console.log("google login script load failure", wtf);
    },
    clientId: googleClientID,
    onSuccess: ({ tokenId, ...rest }) => {
      console.log("success", tokenId, rest);
      login({
        id_token: tokenId,
        type: "google",
      });
    },
    onFailure: (wtf) => {
      console.log("google login  failure", wtf);
    },
  });
  const handleGoogleLogin = () => {
    signIn();
  };
  console.log("google login ", loaded);
  return (
    <StyledSocialButton onClick={handleGoogleLogin} href="#">
      <img className="icon" src={googleSvg} alt="google icon" />
      Sign in with Google
    </StyledSocialButton>
  );
}
