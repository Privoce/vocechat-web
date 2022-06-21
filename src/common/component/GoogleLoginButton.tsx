import { FC, useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import toast from "react-hot-toast";
import styled from "styled-components";
import googleSvg from "../../assets/icons/google.svg?url";
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
}

const GoogleLoginButton: FC<Props> = ({ clientId }) => {
  const [login, { isSuccess, isLoading }] = useLoginMutation();

  const { signIn, loaded } = useGoogleLogin({
    onScriptLoadFailure: (wtf) => {
      console.error("google login script load failure", wtf);
    },
    clientId,
    onSuccess: ({ tokenId, ...rest }) => {
      console.info("google oauth success", tokenId, rest);
      login({
        id_token: tokenId,
        type: "google"
      });
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
  const handleGoogleLogin = () => {
    signIn();
  };

  // console.log("google login ", loaded);
  return (
    <StyledSocialButton disabled={!loaded || isLoading} onClick={handleGoogleLogin}>
      <img className="icon" src={googleSvg} alt="google icon" />
      {loaded ? `Sign in with Google` : `Initailizing`}
    </StyledSocialButton>
  );
};

export default GoogleLoginButton;
