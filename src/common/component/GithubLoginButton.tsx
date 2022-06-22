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

type Props = {
  client_id: string;
  type?: "login" | "register";
};

export default function GithubLoginButton({ type = "login", client_id }: Props) {
  const handleGithubLogin = () => {
    location.href = `http://github.com/login/oauth/authorize?client_id=${client_id}`;
    // console.log("github login");
  };
  // console.log("google login ", loaded);
  return (
    <StyledSocialButton onClick={handleGithubLogin}>
      <IconGithub className="icon" />
      {` ${type === "login" ? "Sign in" : "Sign up"} with Github`}
    </StyledSocialButton>
  );
}
