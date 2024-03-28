import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useGetLoginConfigQuery } from "@/app/services/server";
import GithubLoginButton from "@/components/GithubLoginButton";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import useGithubAuthConfig from "@/hooks/useGithubAuthConfig";
import useGoogleAuthConfig from "@/hooks/useGoogleAuthConfig";
import { useLoginMutation } from "../../app/services/auth";
import { AuthType } from "../../types/common";
import MetamaskLoginButton from "./MetamaskLoginButton";
import OidcLoginButton from "./OidcLoginButton";

type Props = {
  type?: AuthType;
};

const SocialLoginButtons = ({ type = "login" }: Props) => {
  const { t: ct } = useTranslation();
  const [login, { isSuccess }] = useLoginMutation();
  const { config: githubAuthConfig } = useGithubAuthConfig();
  const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
  const { clientId } = useGoogleAuthConfig();

  useEffect(() => {
    if (isSuccess) {
      toast.success(ct("tip.login"));
      // navigateTo("/");
    }
  }, [isSuccess]);
  if (!loginConfigSuccess) return null;
  const {
    github: enableGithubLogin,
    google: enableGoogleLogin,
    metamask: enableMetamaskLogin,
    oidc = []
  } = loginConfig;
  const googleLogin = enableGoogleLogin && !!clientId;
  return (
    <>
      {googleLogin && <GoogleLoginButton type={type} clientId={clientId} />}
      {enableGithubLogin && (
        <GithubLoginButton type={type} client_id={githubAuthConfig?.client_id} />
      )}
      {enableMetamaskLogin && <MetamaskLoginButton type={type} login={login} />}
      {oidc.length > 0 && <OidcLoginButton type={type} issuers={oidc} />}
    </>
  );
};

export default SocialLoginButtons;
