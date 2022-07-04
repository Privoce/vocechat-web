import { useEffect, FC } from "react";
import IconGithub from "../../assets/icons/github.svg";
import styled from "styled-components";
import { KEY_LOCAL_MAGIC_TOKEN } from "../../app/config";

import Button from "./styled/Button";
import { useLoginMutation } from "../../app/services/auth";
import toast from "react-hot-toast";

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

type Props = {
  client_id: string;
  type?: "login" | "register";
};

const GithubLoginButton: FC<Props> = ({ type = "login", client_id }) => {
  //拿本地存的magic token
  const magic_token = localStorage.getItem(KEY_LOCAL_MAGIC_TOKEN);
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const isGithub = query.get("oauth") === "github";
    const code = query.get("code");
    if (isGithub && code) {
      login({
        magic_token,
        code: code,
        type: "github"
      });
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      switch (error?.status) {
        case 410:
          toast.error(
            "No associated account found, please user admin for an invitation link to join."
          );
          break;
        default:
          toast.error("Something Error");
          break;
      }
      return;
    }
  }, [error]);
  const handleGithubLogin = () => {
    location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
  };
  return (
    <StyledSocialButton onClick={handleGithubLogin} disabled={isLoading}>
      <IconGithub className="icon" />
      {` ${type === "login" ? "Sign in" : "Sign up"} with Github`}
    </StyledSocialButton>
  );
};
export default GithubLoginButton;
