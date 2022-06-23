import { FC } from "react";
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

interface Props {
  config: {
    client_id: string;
  };
}

const GithubLoginButton: FC<Props> = ({ config }) => {
  const { client_id } = config;
  const handleGithubLogin = () => {
    location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
    // console.log("github login");
  };
  // console.log("google login ", loaded);
  return (
    <StyledSocialButton onClick={handleGithubLogin}>
      <IconGithub className="icon" />
      Sign in with Github
      {/* {loaded ? `Sign in with Github` : `Initializing`} */}
    </StyledSocialButton>
  );
};

export default GithubLoginButton;
