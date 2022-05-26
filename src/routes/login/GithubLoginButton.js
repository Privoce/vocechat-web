// import { useState, useEffect } from "react";
// import { useGoogleLogin } from "react-google-login";
import IconGithub from "../../assets/icons/github.svg";
import { StyledSocialButton } from "./styled";
export default function GithubLoginButton({ login, clientId }) {
  const handleGithubLogin = () => {
    console.log("github login");
  };
  // console.log("google login ", loaded);
  return (
    <StyledSocialButton onClick={handleGithubLogin}>
      <IconGithub className="icon" />
      Sign in with Github
      {/* {loaded ? `Sign in with Github` : `Initailizing`} */}
    </StyledSocialButton>
  );
}
