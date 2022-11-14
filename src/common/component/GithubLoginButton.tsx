import { FC, useEffect } from "react";
import IconGithub from "../../assets/icons/github.svg";
import styled from "styled-components";
import Button from "./styled/Button";

const StyledSocialButton = styled(Button)`
  width: 100%;
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

type Props = {
  source?: "widget" | "webapp",
  client_id?: string;
  type?: "login" | "register";
};

const GithubLoginButton: FC<Props> = ({ type = "login", source = "webapp", client_id }) => {
  useEffect(() => {
    const handleGithubLoginStatusChange = (evt: StorageEvent) => {
      const { key, newValue } = evt;
      if (key == 'widget' && !!newValue) {
        console.log("github logged in");
        localStorage.removeItem("widget");
        const parentWindow = window.parent;
        if (parentWindow) {
          parentWindow.postMessage("RELOAD_WITH_OPEN", '*');
        }
      }
    };
    if (source == "widget") {
      window.addEventListener("storage", handleGithubLoginStatusChange);
    }

    return () => {
      if (source == "widget") {
        window.removeEventListener("storage", handleGithubLoginStatusChange);
      }
    };
  }, [source]);

  const handleGithubLogin = () => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${location.origin}/github/cb/${source}.html`;
    if (source == "webapp") {
      location.href = redirectUrl;
    } else {
      window.open(redirectUrl);
    }
  };

  return (
    <StyledSocialButton onClick={handleGithubLogin}>
      <IconGithub className="icon" />
      {` ${type === "login" ? "Sign in" : "Sign up"} with Github`}
    </StyledSocialButton>
  );
};
export default GithubLoginButton;
