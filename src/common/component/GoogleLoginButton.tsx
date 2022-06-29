import { FC, useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import toast from "react-hot-toast";
import styled from "styled-components";
import { KEY_LOCAL_MAGIC_TOKEN } from "../../app/config";
import IconGoogle from "../../assets/icons/google.svg";
import Button from "./styled/Button";
import { useLoginMutation } from "../../app/services/auth";

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
  clientId: string;
  type?: "login" | "register";
}

const GoogleLoginButton: FC<Props> = ({ type = "login", clientId }) => {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  // 拿本地存的magic token
  const magic_token = localStorage.getItem(KEY_LOCAL_MAGIC_TOKEN);
  const { signIn, loaded } = useGoogleLogin({
    onScriptLoadFailure: (wtf) => {
      console.error("google login script load failure", wtf);
    },
    clientId,
    onSuccess: (res) => {
      if ("code" in res) {
        console.error(`google login failed: ${res.code}`);
      } else {
        login({ magic_token, id_token: res.tokenId, type: "google" });
      }
    },
    onFailure: (wtf) => {
      console.error("google login failure", wtf);
    }
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      // navigateTo("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error && "status" in error) {
      switch (error.status) {
        case 410:
          toast.error(
            "No associated account found, please contact admin for an invitation link to join."
          );
          break;
        default:
          toast.error("Something Error");
          break;
      }
      return;
    }
  }, [error]);

  const handleGoogleLogin = () => {
    signIn();
  };

  return (
    <StyledSocialButton disabled={!loaded || isLoading} onClick={handleGoogleLogin}>
      <IconGoogle className="icon" />
      {loaded ? `${type === "login" ? "Sign in" : "Sign up"} with Google` : `Initializing`}
    </StyledSocialButton>
  );
};

export default GoogleLoginButton;
