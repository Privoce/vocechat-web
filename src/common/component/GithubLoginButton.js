// import { useState, useEffect } from "react";
// import { useGoogleLogin } from "react-google-login";
import IconGithub from "../../assets/icons/github.svg";
import styled from "styled-components";
import Button from "./styled/Button";
const StyledSocialButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #344054;
  border: 1px solid #d0d5dd;
  background: none !important;
  .icon {
    width: 24px;
    height: 24px;
  }
`;
export default function GithubLoginButton({ config = {} }) {
  const { client_id } = config;
  const handleGithubLogin = () => {
    location.href = `http://github.com/login/oauth/authorize?client_id=${client_id}`;
    // console.log("github login");
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
