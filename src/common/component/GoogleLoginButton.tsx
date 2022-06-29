import { FC, useEffect, useState } from "react";
import { useGoogleLogin, GoogleOAuthProvider, GoogleOAuthProviderProps } from "@react-oauth/google";
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
  loadError?: boolean;
  loaded?: boolean;
  clientId?: string;
  type?: "login" | "register";
}

const GoogleLogin: FC<Props> = ({ type = "login", loaded, loadError }) => {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  //拿本地存的magic token
  const magic_token = localStorage.getItem(KEY_LOCAL_MAGIC_TOKEN);
  const googleLogin = useGoogleLogin({
    // flow: "auth-code",
    onSuccess: ({ access_token }) => {
      login({
        magic_token,
        id_token: access_token,
        type: "google"
      });
    }
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      // navigateTo("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
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
    googleLogin();
  };
  // console.log("google login ", loaded);
  return (
    <StyledSocialButton disabled={!loaded || isLoading} onClick={handleGoogleLogin}>
      <IconGoogle className="icon" alt="google icon" />
      {loadError
        ? "Script Load Error!"
        : loaded
        ? `${type === "login" ? "Sign in" : "Sign up"} with Google`
        : `Initializing`}
    </StyledSocialButton>
  );
};
const GoogleLoginButton: FC<Props> = ({ type = "login", clientId }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  return (
    <GoogleOAuthProvider
      onScriptLoadError={() => {
        setHasError(true);
      }}
      onScriptLoadSuccess={() => {
        setScriptLoaded(true);
      }}
      clientId={clientId}
    >
      <GoogleLogin type={type} loaded={scriptLoaded} loadError={hasError} />
    </GoogleOAuthProvider>
  );
};
export default GoogleLoginButton;
