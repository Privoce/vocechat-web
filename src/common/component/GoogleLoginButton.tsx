import { FC, useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import toast from "react-hot-toast";
import styled from "styled-components";
import { KEY_LOCAL_MAGIC_TOKEN } from "../../app/config";
import IconGoogle from "../../assets/icons/google.svg";
import Button from "./styled/Button";
import { useLoginMutation } from "../../app/services/auth";

const StyledSocialButton = styled(Button)`
  position: relative;
  width: 100%;
  background: white !important;
  border: 1px solid #d0d5dd;
  color: #344054;
  height: 46px;
  overflow: hidden;
  .mask {
    background: inherit;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    z-index: 998;
    height: 40px;
    .icon {
      width: 24px;
      height: 24px;
    }
  }
  > .hide {
    /* z-index: 1; */
    /* opacity: 0; */
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    iframe {
      width: 100% !important;
    }
  }
  &:hover {
     .hide {
      opacity: 0;
      z-index: 999;
    }
  }
`;

interface Props {
  loadError?: boolean;
  loaded?: boolean;
  clientId?: string;
  type?: "login" | "register";
}

const GoogleLoginInner: FC<Props> = ({ type = "login", loaded, loadError }) => {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  //拿本地存的magic token
  const magic_token = localStorage.getItem(KEY_LOCAL_MAGIC_TOKEN);
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

  return (
    <StyledSocialButton disabled={!loaded || isLoading}>
      <div className="mask">
        <IconGoogle className="icon" />
        {loadError
          ? "Script Load Error!"
          : loaded
            ? `${type === "login" ? "Sign in" : "Sign up"} with Google`
            : `Initializing`}
      </div>
      <div className="hide">
        <GoogleLogin
          width="360px"
          onSuccess={(res) => {
            login({
              magic_token,
              id_token: res.credential || "",
              type: "google"
            });
          }}
        />
      </div>
    </StyledSocialButton>
  );
};

const GoogleLoginButton: FC<Props> = ({ type = "login", clientId }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  if (!clientId) return null;
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
      <GoogleLoginInner type={type} loaded={scriptLoaded} loadError={hasError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
