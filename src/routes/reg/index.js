import { Outlet } from "react-router-dom";
import { useMatch } from "react-router-dom";
import BASE_URL from "../../app/config";
import SignInLink from "./SignInLink";
import { useGetLoginConfigQuery } from "../../app/services/server";
import useGithubAuthConfig from "../../common/hook/useGithubAuthConfig";
import useGoogleAuthConfig from "../../common/hook/useGoogleAuthConfig";
import GoogleLoginButton from "../../common/component/GoogleLoginButton";
import GithubLoginButton from "../../common/component/GithubLoginButton";
import StyledWrapper from "./styled";

export default function Reg() {
  const isRegHome = useMatch(`/register`);
  const { clientId } = useGoogleAuthConfig();
  const { config: githubAuthConfig } = useGithubAuthConfig();
  const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
  if (!loginConfigSuccess) return null;
  const {
    github: enableGithubLogin,
    google: enableGoogleLogin,
    who_can_sign_up: whoCanSignUp
  } = loginConfig;
  const googleLogin = enableGoogleLogin && clientId;
  // 没有开放注册
  if (whoCanSignUp !== "EveryOne") return `Open Register is Closed!`;
  return (
    <StyledWrapper>
      <div className="form">
        {isRegHome && (
          <>
            <div className="tips">
              <img src={`${BASE_URL}/resource/organization/logo`} alt="logo" className="logo" />
              <h2 className="title">Sign Up to Rustchat</h2>
              <span className="desc">Please enter your details.</span>
            </div>
          </>
        )}
        <Outlet />
        {isRegHome && (
          <>
            <hr className="or" />
            {googleLogin && <GoogleLoginButton clientId={clientId} />}
            {enableGithubLogin && <GithubLoginButton config={githubAuthConfig} />}
            <SignInLink />
          </>
        )}
      </div>
    </StyledWrapper>
  );
}
